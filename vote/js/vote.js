/**
 * 投票JS
 *
 * @author Tsue Shogo
 * @version
 *	1.0.0	2018/03/04(日) 01:36	新規作成
 *	1.1.0	2018/03/07(水) 11:53	IEキャッシュ対策
 */

// パス情報
var appPath = '/ora-test/vote/'; // 先頭と末尾にスラッシュを付ける

// IEキャッシュ無効
jQuery.ajaxSetup({
	cache: false,
});

jQuery(function($){
	/**
	 * イベント登録
	 */
	// 投票ボタン押下
	$('body').on('click', '.vote-btn', function(){
		voteExecute($(this).data('voteid'), $(this).data('votetype'), $(this).data('voteipignore'));
	});
	
	/**
	 * 初期動作
	 */
	// 帯グラフ表示
	updateBars();
});

/**
 * 投票する
 *
 * @param string voteId
 * @param string voteType	good or bad
 * @param int voteIpIgnore	0 or 1
 * @return void
 */
function voteExecute(voteId, voteType, voteIpIgnore) {
	// パラメータ確認
	if (typeof(voteId) === 'undefined') {
		return;
	}
	if (typeof(voteType) === 'undefined' || !(voteType === 'good' || voteType === 'bad')) {
		return;
	}
	voteIpIgnore = (typeof(voteIpIgnore) !== 'undefined' && (voteIpIgnore * 1)) ? 1 : 0;
	
	// ajax通信
	$.ajax({
		url: appPath,
		type: 'get',
		dataType: 'json',
		data: {
			id: voteId,
			act: 'vote',
			type: voteType,
			ipignore: voteIpIgnore,
		},
		success: function(data) {
			// 帯グラフ表示実行
			updateBarExecute(voteId, data);
		}
	});
}
/**
 * 帯グラフ表示
 *
 * @param string voteId
 * @return void
 */
function updateBars(voteId) {
	// パラメータ確認
	if (typeof(voteId) === 'undefined') {
		voteId = null;
	}
	
	// vote-barでループ
	$('.vote-bar').each(function(){
		var _this = this;
		var thisVoteId = $(this).data('voteid');
		if (voteId && thisVoteId && (voteId !== thisVoteId)) {
			return;
		}
		// ajax通信
		$.ajax({
			url: appPath,
			type: 'get',
			dataType: 'json',
			data: {
				id: thisVoteId,
				act: 'get'
			},
			success: function(data) {
				// 帯グラフ表示実行
				updateBarExecute(thisVoteId, data);
			}
		});
	});
}

/**
 * 帯グラフ表示実行
 *
 * @param string voteId
 * @param object data
 * @return void
 */
function updateBarExecute(voteId, data) {
	// データ取得
	var good = data ? data.good * 1 : 0;
	var bad = data ? data.bad * 1 : 0;
	var total = good + bad;
	var percent = total ? Math.round(good / total * 100) : 50;
	
	// 帯グラフCSS変更
	$('.vote-bar[data-voteid="' + voteId + '"]').css('width', '' + percent + '%');
	
	// ラベル変更
	$('.vote-percent[data-voteid="' + voteId + '"][data-votetype="good"]').html(percent);
	$('.vote-percent[data-voteid="' + voteId + '"][data-votetype="bad"]').html(100 - percent);
	$('.vote-count[data-voteid="' + voteId + '"][data-votetype="good"]').html(good);
	$('.vote-count[data-voteid="' + voteId + '"][data-votetype="bad"]').html(bad);
}