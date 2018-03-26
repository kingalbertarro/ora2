<?php
/**
 * 投票システム
 *
 * @author Tsue Shogo
 * @version
 *	1.0.0	2018/03/04(日) 01:40	新規作成
 */

// 準備
require_once('lib/SqliteDb.php');
require_once('lib/Request.php');
$db = new SqliteDb();
$req = new Request();

// 分岐
if (!($ip = $req->server('REMOTE_ADDR'))) {
	
	// [0] IPアドレスが無い場合は404
	throw404();
	
} else if (($id = $req->get('id')) && ($act = $req->get('act')) && ($act == 'get')) {
	
	// [1] 指定したIDの投票情報を取得
	$record = $db->get($id);
	$req->out($record);
	
} else if (($id = $req->get('id')) && ($act = $req->get('act')) && ($act == 'vote') && ($type = $req->get('type')) && in_array($type, ['good', 'bad'])) {
	
	// [2] 指定したIDに投票
	if (!($record = $db->vote($id, $type, $ip, $req->get('ipignore') ? true : false))) {
		throw404();
	}
	$req->out($record);
	
} else {
	
	// [99] どれにも該当しない場合
	throw404();
}
// 終了
exit;

/**
 * 404を返す
 *
 * @return void
 */
function throw404() {
	header("HTTP/1.1 404 Not Found");
	exit;
}

