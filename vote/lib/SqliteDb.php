<?php
/**
 * SQLite3データベース
 *
 * @author Tsue Shogo
 * @version
 *	1.0.0	2018/03/04(日) 03:00	新規作成
 */
class SqliteDb {
	
	/**
	 * PDOインスタンス
	 */
	private $pdo;
	
	/**
	 * コンストラクタ
	 */
	public function __construct() {
		// pdo準備
		$sqlite3FilePath = dirname(dirname(__FILE__)) . '/data/vote.sqlite3';
		$this->pdo = new PDO('sqlite:' . $sqlite3FilePath);
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		
		// テーブル作成
		$this->pdo->exec(
			'CREATE TABLE IF NOT EXISTS vote( '
			. 'vote_id INTEGER PRIMARY KEY AUTOINCREMENT, '
			. 'id VARCHAR(100), '
			. 'good INTEGER, '
			. 'bad INTEGER '
			. ') '
		);
		
		// テーブル作成
		$this->pdo->exec(
			'CREATE TABLE IF NOT EXISTS log( '
			. 'log_id INTEGER PRIMARY KEY AUTOINCREMENT, '
			. 'ip VARCHAR(20), '
			. 'id VARCHAR(100), '
			. 'type VARCHAR(10), '
			. 'created VARCHAR(20) '
			. ') '
		);
	}
	
	/**
	 * 指定したIDの投票情報取得
	 *
	 * @param string	$id
	 * @return array
	 */
	public function get($id) {
		// SQL生成
		$sql = '';
		$sql .= 'SELECT ';
		$sql .= ' * ';
		$sql .= 'FROM ';
		$sql .= ' vote ';
		$sql .= 'WHERE ';
		$sql .= ' id = ? ';
		$vars = [$id];
		
		// 実行
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute($vars);
		$records = $stmt->fetchAll();
		
		return !empty($records) ? $records[0] : null;
	}
	
	/**
	 * 指定したIDに投票
	 *
	 * @param string	$id
	 * @param string	$type		good, bad
	 * @param string	$ip			IPアドレス
	 * @param bool		$ipIgnore	IPアドレスチェックを無視するかどうか
	 * @return array
	 */
	public function vote($id, $type, $ip, $ipIgnore) {
		// 存在確認
		$record = $this->get($id);
		
		// IP確認
		if (!$ipIgnore) {
			$sql = '';
			$sql .= 'SELECT ';
			$sql .= ' * ';
			$sql .= 'FROM ';
			$sql .= ' log ';
			$sql .= 'WHERE ';
			$sql .= ' id = ? ';
			$sql .= ' AND ip = ? ';
			$sql .= ' AND created > datetime(\'now\', \'-1 hours\') ';
			$vars = [$id, $ip];
			$stmt = $this->pdo->prepare($sql);
			$stmt->execute($vars);
			$logs = $stmt->fetchAll();
			if ($logs) {
				return $record;
			}
		}
		
		if ($record) {
			// 更新
			$sql = '';
			$sql .= 'UPDATE ';
			$sql .= ' vote ';
			$sql .= 'SET ';
			$sql .= ' good = ?, ';
			$sql .= ' bad = ? ';
			$sql .= 'WHERE ';
			$sql .= ' id = ? ';
			$vars = [
				$type === 'good' ? $record['good'] + 1 : $record['good'],
				$type === 'bad' ? $record['bad'] + 1 : $record['bad'],
				$id,
			];
		} else {
			// 登録
			$sql = '';
			$sql .= 'INSERT ';
			$sql .= 'INTO ';
			$sql .= ' vote ';
			$sql .= ' (id, good, bad) ';
			$sql .= ' VALUES ';
			$sql .= ' (?, ?, ?) ';
			$vars = [
				$id,
				$type === 'good' ? 1 : 0,
				$type === 'bad' ? 1 : 0,
			];
		}
		// 実行
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute($vars);
		
		// ログ保存
		$sql = '';
		$sql .= 'INSERT ';
		$sql .= 'INTO ';
		$sql .= ' log ';
		$sql .= ' (id, ip, type, created) ';
		$sql .= ' VALUES ';
		$sql .= ' (?, ?, ?, CURRENT_TIMESTAMP) ';
		$vars = [
			$id,
			$ip,
			$type,
		];
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute($vars);
		
		// 再取得
		return $this->get($id);
	}
}