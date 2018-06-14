// Erya Exam Helper Script
// version 0.2.1
// 2018-6-10
// Copyright (c) 2018, Unixeno
// Released under the MIT license
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Erya Exam Helper
// @author				Unixeno
// @namespace     https://yangwang.hk/
// @version  			0.2.1
// @description   在你进行超星尔雅考试的时候，在页面下方显示考题的答案
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @include       https://mooc1-*.chaoxing.com/exam/*
// @icon					https://erya.unixeno.com/favicon.ico
// ==/UserScript==

var version_info = 'v0.2.1';

console.log("working");

console_div = "<div style='position:fixed;left:5px;bottom:5px;width:95%;height:120px;border-style:solid;border-width:3px;padding:10px 20px;\
font-size:18px;' id='console-div'>\
<p style='font-size:16px;'>Erya Exam Helper "+version_info+"</p>\
<p id='question'></p>\
<p id='question-p' style='display:none;'>答案：<span id='answer' style='color:red'></span></p>\
<p id='footprint' style='position:absolute;bottom:5px;font-size:16px;'><span>Copyright (c) 2018, <a href='https://yangwang.hk/' style='color:#72ACE3' target='_blank'>Unixeno</a>. Released under the MIT license.</span>\
&nbsp;&nbsp;&nbsp;课后题查询请上：<a href='https://erya.unixeno.com/' style='color:#72ACE3' target='_blank'>尔雅查题助手</a>&nbsp;&nbsp;&nbsp;\
<span style='color:red'>如果你觉得好用，你可以捐助我：</span><a href='https://erya.unixeno.com/#donate' style='color:#72ACE3' target='_blank'>捐助我</a></p>\
</div>";


$(document).ready(function(){
  $("body").append(console_div);
  if(window.location.pathname == '/exam/test/reVersionTestStartNew'){
    $('#question-p').show();
    checker()
  }else{
    $('#question').text('答案将在开始考试后自动获取');
  }
});

function checker()
{
  current_question = $('.TiMu').find('.Cy_TItle').children('div').text();
  current_question = $.trim(current_question);
  $('#question').text(current_question);
  $('#answer').text("获取中...");
  var reg=new RegExp('(.*)（.*分）');
  filter = reg.exec(current_question)
  filtered_question = filter[1];
  update_answer(filtered_question);
}

function update_answer(question)
{
  uid = $.cookie('UID');
  database_url = 'https://erya.unixeno.com/Home/Index/exam_api.html?question='+question+'&uid='+uid;
  $.get(database_url, function(data){
    if(data['err'] != 0){
      $('#answer').text("查询失败");
    }
    else
      $('#answer').text(data['answer']);
  })
}

