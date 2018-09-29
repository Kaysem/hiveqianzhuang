<template>
  <div id="app">
    <router-view></router-view>    
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{
    }
  },
  mounted:function(){
    let _this = this;
    
    
  },
  methods:{
  },
  watch:{
  }
}

</script>

<style>
  body,html {
    margin:0;
    padding:0;
    width: 100%;
    height:100%;
    background:#01061e;
    color: #fff !important;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
    height:100%;
    width:100%;
  }
  .el-container{
    width:100%;
    height:100%;
  }
  .el-header {
      background-color: rgba(255,255,255,0.1);
      text-align: left;
      line-height: 60px;
    }
  .logo {
        vertical-align:middle;
  }
  .remove_tit .el-icon-arrow-down:before {
    content: '' !important;
  }
  .el-aside {
    background-color: rgba(255,255,255,0.05) !important;
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow: hidden !important;
  }

  .el-main {
    color: #333;
    padding: 20px 20px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .el-submenu__title {
    text-align:left;
    font:12px 'MicrosoftYaHei';
    height: 38px;
    line-height: 38px;
    color: #fff;
  }
  aside {
    text-align:left;
  }
  .el-main {
    padding: 0;
  }
  .content_main {
    width: 97.5% !important;
    height: 95.5% !important;
    /* margin: 1% auto !important; */
    padding: 0 !important;
  }
  aside ul {
    height:100%;
  }
  aside ul li {
    text-align:left;
  }
  /* .second_title>li  .el-submenu__title {
      height: 38px;
      line-height: 35px;
  }
  .second_title .el-submenu__title {
    font-size: 14px;
    padding-left: 20px;
    height: 38px;
    line-height: 53px;

  }
  .second_title ul li {
    font-size:12px;
    padding: 0 40px !important;
  } */
  a {
      text-decoration: none;
      color: #b9b8b8;
      width: 100%;
      height: 100%;
      display:inline-block;
  }
  .el-menu {
      border-right:none;
      background-color: inherit;
      width: 100% !important;
  }
  .el-submenu__title:hover {
      background-color: #000;
  }
  .el-menu-item:focus, .el-menu-item:hover {
      outline: 0;
      background-color: #000;
  }
  .el-form-item {
  padding-bottom: 22px;
  }
  .creatContent {
    height: 60px;
  }
  /* 图标icon  S */
  .icon_pic {
    display: inline-block;
    vertical-align : middle;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .overview {
    background: url('./assets/images/overview.png') no-repeat;
    background-size: 100% 100%;
  }
  .cockpit {
    background: url('./assets/images/cockpit.png') no-repeat;
    background-size: 100% 100%;
  }
  .shoplist {
    background: url('./assets/images/shoplist.png') no-repeat;
    background-size: 100% 100%;
  }
  .usercenter {
    background: url('./assets/images/usercenter.png') no-repeat;
    background-size: 100% 100%;
  }
  .power {
    background: url('./assets/images/power.png') no-repeat;
    background-size: 100% 100%;
  }
  .black {
    background: url('./assets/images/black.png') no-repeat;
    background-size: 100% 100%;
  }
  .is-active .overview {
      background: url('./assets/images/overview_hover.png') no-repeat;
      background-size: 100% 100%;
  }
  .is-active .cockpit {
      background: url('./assets/images/cockpit_hover.png') no-repeat;
      background-size: 100% 100%;
  }
  .is-active .shoplist {
      background: url('./assets/images/shoplist_hover.png') no-repeat;
      background-size: 100% 100%;
  }
  .is-active .usercenter {
      background: url('./assets/images/usercenter_hover.png') no-repeat;
      background-size: 100% 100%;
  }
  .is-active .power {
      background: url('./assets/images/power_hover.png') no-repeat;
      background-size: 100% 100%;
  }
  .is-active .black {
      background: url('./assets/images/black_hover.png') no-repeat;
      background-size: 100% 100%;
  }
  .is-active>.el-submenu__title {
      color: #fff;
  }
  /* 图标icon  E */
  .el-menu-item, .el-submenu__title {
    padding-left: 5px ;
    height: 38px;
    line-height: 38px;
  }
  #leftmune {
    margin-top: -36px;
  }
  .content_main {
    background : rgba(255,255,255,0.1);
    height: 100%;
  }
  .content_main {
    color : #fff;
  }
  .el-submenu .el-menu-item {
      height: 38px;
      line-height: 38px;
      padding: 0 0 0 65px !important;
  }
  .content_main {
    width: 100%;
    background: rgba(255,255,255,0.1);
    border-radius : 10px;
  }
  .finish_table table thead .cell , .ready_table table thead .cell{
    text-align: center;
    color: #282828;
    font-weight: 400;
    font-size: 14px;
  }
  .finish_table table thead tr, .ready_table table thead tr{
    background: #d7dfeb !important;
  }
  .finish_table table tbody tr, .ready_table tbody tr{
    color: #666;
    font: 12px 'ArialMT,MicrosoftYaHei'
  }
  .pages {
    text-align: right;
    margin-bottom : 50px;
  }
  .pages ul li ,.pages button {
    border: 1px solid #999 !important;
    margin: 20px 5px !important;
    color: #999;
    border-radius: 5px;
    min-width:28px;
  }
  .pages span {
    margin: 20px 20px !important;

  }
  .el-pagination .btn-prev , .el-pagination .btn-next {
    padding: 0 ;
    text-align: center;
    margin-right:5px;
    border-radius: 5px;
  }
  .el-input__inner{
      border-color: #4b62df;
  }
  .el-checkbox {
    width: 14%;

  }
  .el-input__inner:hover {
      border-color: #4b62df;
  }
  .el-table .warning-odd {
      background: #fff !important;
  }
  .el-table .warning-even {
      background: #f6f8fc !important;
  }
  .el-input input {
    height: 34px;
  }
  .el-dialog__header {
    text-align: center;
  }
  .el-dialog__body {
    padding: 0 20px 20px;
  }
  .el-icon-date:before{
    content: '';
  }
  .el-icon-date:after{
    content: '';
  }
  .el-collapse, .el-collapse-item__header, .el-collapse-item__wrap{
    border: 0;
  }
  .el-form-item__content {
    margin: 0 !important;
  }
  .el-input__inner {
      border-color: #d7dfeb;
  }
  p {
    margin: 0
  }
  .money .el-input{
    width : 30% !important;
  }
  .check_box>span>span {
    border-radius: 50%;
  }
  .el-collapse-item__header {
    color: #282828;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    padding-left: 2%;
  }
  .el-collapse-item__header>i {
    position: absolute;
      left: 0%;
  }
  .el-checkbox-group {
    margin-left: 20px;
  }
  .people .el-collapse-item__content>label {
    margin: 20px 0 0;
  }
  .creat_times .el-input[data-v-38417d58] {
    width:40%;
    position: relative;

  }
  .el-icon-date {
    background: url('./assets/images/dates1.png') no-repeat;
    height:25px;
    vertical-align:middle;
    background-size: 100% 100%;
  }
  .creat_times .el-icon-date:before , .event_bj_con_left>p:nth-child(2) .el-icon-date:before {
    content: '';
  }
  .creat_times .el-input__inner , .event_bj_con_left>p:nth-child(2) .el-input__inner {
    padding: 0 0 0 50px;
  }
  .inlineBlock {
    display: inline-block;
    vertical-align: middle;
  }
  .times_start , .times_end {
    width: 48%;
  }
  .el-icon-date {
    height: 25px;
  }
  .el-input__prefix {
    line-height: 35px;
  }
  .demonstration{
    margin-right:10px;
  }
  .el-input__prefix{
    left: 12px;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
  .textarea_content textarea{
    border-radius: 4px;
    background: #f1f4f9;
    border-color: #d7dfeb;
  }
  /* .look_boxs .el-input.is-disabled .el-input__inner {
    border: 0 !important;
    color: #222;
  }
  .look_boxs .el-input.is-disabled .el-input__inner {
      padding: 10px;
    background: #fff;
  }
  .look_boxs {
    color: #282828;
    font-weight: 600;
  }
  .look_boxs .el-dialog__footer , .creatpeoples .form_footer {
    text-align:center;
  }
  .el-button--primary {
        background-color: #4660e7;
      border-color: #4660e7;
  }
  .look_boxs .el-button[data-v-38417d58]:focus,.look_boxs  .el-button[data-v-38417d58]:hover {
          background-color: #4660e7 ;
      border-color: #4660e7 ;
      color: #fff ;
  }
  .look_other_con .el-textarea.is-disabled .el-textarea__inner{
      background-color: #fff;
      border: none;
      color: #000
  } */
  .isdisabled_input input:hover {
    background: pink;
  }
  .clearfix:after {
      content: "";
      display: block;
      clear: both;
      visibility: hidden;
      height: 0;
      font-size:0;
  }
  .clearfix{
    zoom: 1;
  }
  .fl {
    float:left;
  }
  .fr {
    float: right;
  }
  h1,h2,h3,h4,h5,h6,div,input,ul,li,img{
    margin: 0;
    padding: 0;
  }
  ul {
    list-style : none;
  }
  i,em {
    font-style: normal;
  }
  .UScontent .el-col-12 {
    width: 49% !important;
  }
  .el-table th>.cell {
    text-align: center;
  }
  table thead tr{
    background: #d7dfeb !important;
    color: #282828;
  }
  table tbody tr td{
    color: #666;
  }
  .el-dialog{
    background-color: #313856;
    width: 480px !important;
    margin-top: 180px !important;
  }
  .el-dialog__title {
    color: #fff;
    font-size: 16px;
  }
  .el-dialog__close{
    color: #fff !important;
    font-size: 26px;
  }
  .el-dialog__footer {
    text-align : center;
  }
  .content_main {
  background: rgba(255,255,255,0) !important;
  }
  .el-table__row {
      text-align: center;
  }
  .change_event .el-dialog__body {
    padding: 56px 0;
    font-size: 16px;
  }
  .el-table{
    text-align: center;
    box-shadow: 1px 1px 19px rgba(0, 0, 0, 0.2);
  }
  #usercenter .title_error .el-dialog__body {
    height: 150px;
    text-align: center;
    font-size: 16px;
    color: #222;
    padding-top: 50px;
  }
  #usercenter .USsearch_btn {
        background: orange;
    color: #fff;
  }
  #usercenter  .US_search .el-input {
    width:300px;
  }
  #usercenter  .US_search .el-input input {
    height: 40px;
  }




  #leftmune>li>div>.el-icon-arrow-down:before {
    content: '';
  }
  .look_time_con .el-icon-date {
    width: 0;
    height: 0;
    background: none;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    cursor: auto;
  }
  .look_time_con .el-input.is-disabled .el-input__inner {
    cursor: auto;
  }
  .el-menu-item.is-active {
      color: #fff;
      background: rgb(0,0,0);
  }
  .el-submenu__title .el-icon-arrow-down i{
    color: #fff;
  }
  .titles_color {
    color: #fff !important;
  }
  .is-active .is-active {
    color: #fff;
  }
  .el-table__header-wrapper {
    background: #d7dfeb !important;
  }
  .el-textarea textarea {
      font-family: 'Microsoft YaHei','SimSun';
  }
  #userpicture .el-radio__input.is-checked+.el-radio__label {
      color: #fff;
  }
  .el-date-editor--daterange.el-input__inner {
    width: 100% !important;
  }
  .el-range-editor.el-input__inner {
    padding: 0 !important;
  }
  .el-date-editor .el-range-separator {
    color: #fff;
  }
  .el-date-editor .el-range__icon{
        position: relative;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
  }
  .el-date-editor .el-range-input {
    background: rgba(0,0,0,0);
    color: #fff;        
  }
  .el-carousel__button {
    background-color: #000;
    height: 6px ;
    width: 6px;
    border-radius: 50%;
  }
  .el-carousel__indicator {
    padding: 0px 1px;
  }
  .el-date-range-picker {
    width: 513px;
  }
  .el-picker-panel {
    right: 36px;
  }
  .el-pagination {
      text-align: right;
      padding: 2px 16px;
  }
  .el-pagination .btn-next{
      background: center center no-repeat rgba(255,255,255,0.2);
      color: #fff;
      margin-left: 5px;
  }
  .el-pagination .btn-prev  {
      background: center center no-repeat rgba(255,255,255,0.2);
      color: #fff;
  }
  .el-pagination button.disabled {
        background-color:rgba(255,255,255,0.2);
  }
  .el-pager li.btn-quicknext, .el-pager li.btn-quickprev {
    color: #fff;
  }
  .el-pager li.active {
    background-color: #91a2eb;
  }
  .el-pagination button, .el-pagination span:not([class*=suffix]){
    min-width: 28.5px;
  }
  .btn-prev {
    margin-right: 5px;
  }
  .el-pager>li {
    margin-right: 5px;
    background:rgba(255,255,255,0.2);
    color: #fff;
    min-width: 28.5px;
    border-radius: 5px;
  }
  .el-pager>li:last-child {
    margin-right: 0;
  }
  .el-pager li:hover {
      color: #fff;
      background: #91a2eb;
      cursor: pointer;
  }
  .el-pager li.active {
      color: #fff;
      background: #91a2eb;
      cursor: pointer;
  }
  #shopList .el-pagination {
    margin: 30px 0px 50px;
  }
  .el-pagination .btn-prev:hover, .el-pagination .btn-next:hover {
    background: #91a2eb;
    color: #fff;
  }
  .digits i {
    background: url('./assets/images/newnumbers.png') no-repeat;
    width:20px;
    height: 28px;
    display: inline-block;
  }
  .digits b {
      background: url("./assets/images/newnumbers.png") no-repeat 0 -398px;
      width:20px;
      height: 28px;
      display: inline-block;
  }
  /* @media screen and (max-width:992px) {
    .el-aside {
      width:50px !important;
    }
  } */
  .navs_show{
     display: none;
  }
  .BMap_cpyCtrl {  
    display: none;  
  }  
  .anchorBL {  
      display: none;  
  }
  .el-submenu__title {
    /* padding: 0 !important; */
    height: 38px;
    line-height: 38px;
    color: #878d99;
    font-size: 14px;
  }
  .el-submenu__title:hover {
    background: rgba(0, 0, 0, 0);
  }
  .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
        background-color: #b4bccc !important;
        color: #fff !important;
  }
  .el-table {
    font-size: 12px;
  }
  #user .top_right .searchinput>input ,#role .top_right .searchinput>input ,#store .top_right .searchinput>input,#system .top_right .searchinput>input , #blacklist .top_right .searchinput>input {
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
      width: 220px;
      border-color: #91a2eb;
      background: rgba(0,0,0,0);
      display: inline-block;
      height: 35px;
      color: #fff;
      vertical-align: bottom;
  } 
  #user .top_right .searchinput>div ,#role .top_right .searchinput>div ,#store .top_right .searchinput>div ,#system .top_right .searchinput>div ,#blacklist .top_right .searchinput>div {
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
      background: #91a2eb;
      border-color: #91a2eb;
      display: inline-block;
      height: 33px;
      padding: 0px 12px;
      width: 24px;
  } 
  #user .top_right .searchinput>div:hover ,#role .top_right .searchinput>div:hover,#store .top_right .searchinput>div:hover ,#system .top_right .searchinput>div:hover,#blacklist .top_right .searchinput>div:hover {
      opacity: 0.8;
  }
  #user .top_right .searchinput>div:active , #role .top_right .searchinput>div:active, #store .top_right .searchinput>div:active , #system .top_right .searchinput>div:active , #blacklist .top_right .searchinput>div:active {
      opacity: 1;
  }
  #user .top_right .searchinput>div>button ,#role .top_right .searchinput>div>button,#store .top_right .searchinput>div>button ,#system .top_right .searchinput>div>button  ,#blacklist .top_right .searchinput>div>button {
    margin: -5px -20px;
  }
  #user .el-pagination,#role .el-pagination ,#store .el-pagination ,#system .el-pagination ,#blackadd .el-pagination ,#blacklist .el-pagination {
      display: inline-block;
      padding-left: 0px;
      padding-right: 0px;
  }
  #user .el-icon-search:before,#role .el-icon-search:before ,#store .el-icon-search:before  ,#system .el-icon-search:before  ,#blacklist .el-icon-search:before {
    color: #fff;
    font-size: 18px;
  }
  #user .el-table__body .el-table_1_column_8 .cell ,#role .el-table__body .el-table_1_column_8 .cell ,#system .el-table__body .el-table_1_column_8 .cell  ,#blacklist .el-table__body .el-table_1_column_8 .cell  {
      /* line-height: 6px; */
  }
  #user table thead tr,#role table thead tr ,#store table thead tr ,#system table thead tr ,#blacklist table thead tr {
      background: #242a44 !important;
      color: #fff;
      border: none;
      font-size: 14px;
  }
  #user .el-table tr ,#role .el-table tr, #store .el-table tr , #system .el-table tr , #blacklist .el-table tr {
    background: #1a1f37; 
  }
  #user .el-table tr:hover ,#role .el-table tr:hover ,#store .el-table tr:hover ,#system .el-table tr:hover ,#blacklist .el-table tr:hover {
    background: #0f1329; 
  }
  #user table tbody tr td , #role table tbody tr td , #store table tbody tr td , #system table tbody tr td , #blacklist table tbody tr td {
    color: #fff;
    border: none;
  }
  #user .el-table--striped .el-table__body tr.el-table__row--striped td ,#role .el-table--striped .el-table__body tr.el-table__row--striped td ,#store .el-table--striped .el-table__body tr.el-table__row--striped td  ,#system .el-table--striped .el-table__body tr.el-table__row--striped td  ,#blacklist .el-table--striped .el-table__body tr.el-table__row--striped td { 
    background: #242a44 !important;
    border: none;
  }
  #user .el-table--enable-row-hover .el-table__body tr:hover>td ,  #role .el-table--enable-row-hover .el-table__body tr:hover>td ,  #store .el-table--enable-row-hover .el-table__body tr:hover>td ,  #system .el-table--enable-row-hover .el-table__body tr:hover>td ,  #blacklist .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: #0f1329;
  }
  #user .el-table--striped .el-table__body tr.el-table__row--striped:hover td ,#role .el-table--striped .el-table__body tr.el-table__row--striped:hover td ,#store .el-table--striped .el-table__body tr.el-table__row--striped:hover td ,#system .el-table--striped .el-table__body tr.el-table__row--striped:hover td ,#blacklist .el-table--striped .el-table__body tr.el-table__row--striped:hover td {
    background: #0f1329 !important;
  }
  .el-table td, .el-table th.is-leaf {
    border: none;
  }
  .el-table::before {
    height: 0;
  }
  .el-table__body {
        /* table-layout: fixed !important; */
  }
  #user .el-table, .el-table__expanded-cell ,#role .el-table, .el-table__expanded-cell ,#store .el-table, .el-table__expanded-cell  ,#system .el-table, .el-table__expanded-cell  ,#blacklist .el-table, .el-table__expanded-cell {
    background: #0f1329;
    
  }
  #user .el-table__header-wrapper , #role .el-table__header-wrapper  , #store .el-table__header-wrapper , #system .el-table__header-wrapper, #blacklist .el-table__header-wrapper {
    background: #0f1329 !important;
  }
  .el-form-item__label {
      color: #a0a4bd;
      padding-right: 18px;
      /* width: 10%; */
  }
  .el-form-item__content{
     display: inline-block;
     width: 80%;
  } 
  .el-dialog__body .el-input__inner {
    background: #202641;
    color: #a0a4bd;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-select-dropdown {
    background-color: #202641;
  }
  .el-select {
    width: 100%;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background: rgba(0, 0, 0, .5);
    color: #888;
  }
  #role .Write .el-dialog{
      width: 640px !important;
  }
  .el-carousel__mask, .el-cascader-menu, .el-cascader-menu__item.is-disabled:hover, .el-collapse-item__header, .el-collapse-item__wrap {
    	background-color: #202641;
      color: #a0a4bd;
  }
  .el-collapse-item__content {
      color: #a0a4bd;
  }
  .el-collapse-item__header>i {
    left: 96%;
  }
  .el-dialog__wrapper .el-icon-arrow-right:before {
    content: "";
    width: 2px;
    height: 15px;
    background: #ffffff;
    display: inline-block;
  }
  .el-collapse {
    margin-top: 30px;
  }
  .el-tree {
    background: rgba(0, 0, 0, 0);
    color: #a0a4bd;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content , .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{
    background: rgba(0, 0, 0, 0);
  }
  .el-icon-caret-right:before {
    /* content: ''; */
  }
  #role .el-checkbox {
    width: 14px;
  }
  .el-checkbox__inner {
    border-radius: 4px;
  }
  .el-tree-node.is-expanded>.el-tree-node__children {
    white-space: normal;
  }
  /* .administration .el-tree-node__children>.el-tree-node {
    display: inline-block;
  }
  .administration .el-tree-node__children>.el-tree-node .el-checkbox__inner {
    border-radius: 50%;
  } */
  .el-checkbox__inner {
    background-color: #a0a4bd;
  }
  #role .el-select {
    width: 60%;
  }
  #role .el-select>.el-input {
    width: 100%;
  }
  #role .Write .el-icon-arrow-up:before{
    content: "";
  }
  #role .el-input.is-disabled .el-input__inner{
    background: rgba(255,255,255,0);
    border: none;
    cursor: inherit;
  }
  #store .el-form-item__label {
        width: 20%;
  }
  #store .Look .el-dialog {
    width: 600px !important;
  }
  #changepw .el-step__title.is-finish {
      color: #fff;
  }
  #changepw .el-step__title.is-process{
    color: #9598ae;
  }
  #changepw .el-step__head.is-process {
    color: #9598ae;
  }
  #changepw .el-step__title.is-wait{
    color: #9598ae;
  }
  #changepw .el-step__head.is-wait {
    color: #9598ae;
  }
  #changepw .is-finish .el-step__icon.is-text {
    background-color: #4c9ff8;
    border-color: #4c9ff8;
    color: #fff;
  }
  #changepw input[disabled="disabled"] {
    background-color: #5a607b ;
    cursor: pointer;
  }
  #store .Write .el-select>.el-input {
    width: 100%;
  }
  .el-button:focus, .el-button:hover , .el-button:active {
    opacity: 0.8 !important;
  }
  #store .el-button:focus, #store .el-button:hover {
    background: #aebaee;
  }
   #store .el-button:active{
     background :#6477c8;
   }
  #user .el-dialog__body .el-select>.el-input{
    width: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }
  .el-menu-item-group .el-menu-item-group__title{
    font-size: 0;
    height: 0;
    padding: 0;
  }
  .look_select {
    width: 80px;
  }
  .look_select>div {
    width: 100%;
  }
  .look_select .el-input.is-disabled .el-input__inner{
    padding: 0;
    height: 20px;
    background: rgba(0,0,0,0);
    border: none;
  }
  .Look .el-select .el-input.is-disabled .el-input__inner{
    cursor: inherit;
  }
  .look_select .el-icon-arrow-up:before {
    content: "";
  }
  #role .el-input-group__append button{
    background: rgba(0, 0, 0, 0);
  }
  #store #storeName {
      background: rgba(0,0,0,0);
      border: none;
      cursor: auto;
  }
  #select_storeid .el-form-item__content {
      width: 100%;
  }
  #select_storeid .el-form-item__content .el-autocomplete {
    width: 80%;
  }
  .el-autocomplete-suggestion {
    z-index: 9999 !important;
  }
  .el-scrollbar__wrap{
        /* background-color: #202641; */
  }
  .el-autocomplete-suggestion li.highlighted, .el-autocomplete-suggestion li:hover {
    /* background: rgba(0, 0, 0, .5); */
    /* color: #888; */
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after {
    border-color: #171818 !important;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #afb9cc;
  }
  .login_out .el-dropdown-link {
    color: #fff !important;
  }
  #blackadd .el_input {
      width: 100%;
  }
  #blackadd .el-scrollbar__wrap {

  }
  #blackadd .el-input__inner {
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    height: 34px;
    border-radius: 15px;
    border-color: #4e7cc8;
  }
  #blackadd .shopname{
      width:120px;
      display: inline-block;
  }
  #blackadd .shopname>div {
    width: 100%;
  }
  #blackadd .shopname>div>div {
    width: 100%;
  }  
  #blackadd .el-date-range-picker{
    width: 513px !important;
  }
  
  .el-carousel__indicators {
    width: 100%;
  }
  #blackadd .dialog_box .el-dialog__body , #blacklist .dialog_box .el-dialog__body{
    color: #fff;
    font-size: 16px;
    padding: 25px 40px 30px;
  }
  #blackadd .el-dialog__title , #blacklist .el-dialog__title {
    font-size: 20px;
  }
  #blackadd .goback {
    margin-left: 80px;
  }
  #blackadd .dialog_look .el-dialog {
    width: 500px !important;
    margin-top: 0px !important;
    transform: translateY(-50%);
    top: 50%; 
  }
  #blackadd .dialog_look .el-dialog--center .el-dialog__body{
    padding-top: 10px;
  }
  .el-date-range-picker__time-picker-wrap .el-input {
    width: 100%;
  }
  #blackadd .el-dialog--center .el-dialog__header {
    padding-top: 15px !important;
  }
  #blackadd .el-input__inner i.el-input__icon:first-child:before {
    content: '';
    height: 16px;
    width: 16px;
    display: inline-block;
    vertical-align: middle;
    background: url("./assets/images/datatime.png") no-repeat;
    background-size: 100% 100%;
  }
  #blackadd .el-input__inner i.el-input__icon:first-child {
    line-height: 30px;
  }
</style>
