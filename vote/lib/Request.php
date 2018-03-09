<?php
/**
 * リクエスト
 *
 * @author Tsue Shogo
 * @version
 *	1.0.0	2018/03/04(日) 03:00	新規作成
 */
class Request {
	/**
	 * GETリクエスト値取得
	 *
	 * @param string	$key
	 * @return string
	 */
	public function get($key) {
		return !empty($_GET[$key]) ? $_GET[$key] : null;
	}
	
	/**
	 * POSTリクエスト値取得
	 *
	 * @param string	$key
	 * @return string
	 */
	public function post($key) {
		return !empty($_POST[$key]) ? $_POST[$key] : null;
	}
	/**
	 * SERVERリクエスト値取得
	 *
	 * @param string	$key
	 * @return string
	 */
	public function server($key) {
		return !empty($_SERVER[$key]) ? $_SERVER[$key] : null;
	}
	
	/**
	 * JSON出力
	 *
	 * @param array	$compact
	 * @return void
	 */
	public function out($compact = []) {
		header('content-type: application/json; charset=utf-8');
		echo json_encode($compact);
		exit;
	}
}