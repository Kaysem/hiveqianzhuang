
const baseUrl  = 'http://43.243.137.165:56789/api/ckdxh'; //外网  店小伙  
const baseUrl3 = 'http://43.243.137.165:56789/api/exec';  //外网  店小伙  
const baseUrl2 = 'http://43.243.137.165:9001/master';  //外网  店小伙  
//以前219.239.133.70 
// 黑名单->base地址
const baseUrl4 = 'http://172.16.29.15:56789';  //吴新  本地测试

// 金王拷过来测试 ->S
// const baseUrl4 = 'http://face.umessage.com.cn';  //贺月杰 线上
// const baseUrl4 = 'http://172.16.29.18:6789';  //贺月杰  本地测试
// 金王拷过来测试 ->End

// const baseUrl = 'http://172.16.25.66:56789/api/ckdxh';  //wuxin 
// const baseUrl3 = 'http://172.16.25.66:56789/api/exec';  //wuxin 



// const baseUrl = 'http://172.16.24.136:56789/api/ckdxh';  //孟斌
// const baseUrl2 = 'http://172.16.22.78:56789/master';  //孟斌
// const baseUrl3 = 'http://172.16.24.136:56789/api/exec';  //孟斌


// const baseUrl = 'http://172.16.18.77:56789/api/ckdxh';  //自己
// const baseUrl2 = 'http://172.16.18.77:56789/master';  //自己
// const baseUrl3 = 'http://172.16.18.77:56789/api/exec';  //自己

// 测试  权限
// const baseUrl = 'http://172.16.24.136:56789/api/ckdxh';  //本地部署
// const baseUrl2 = 'http://172.16.24.133:6789/master'; //本地部署
// const baseUrl3 = 'http://172.16.24.136:56789/api/exec';  //本地部署


export default {
    "getVipDistribution": baseUrl+'/getVipDistribution',  //首页用户数据
    "getVipChina": baseUrl+'/getVipChina',  //首页地图数据
    "getVipProc": baseUrl+'/getVipProc',  //单个省份各市用户量

    // 门店信息->会员实况
    "getSome": baseUrl+'/getSome',  //用户照片墙
    "getMemFlow" : baseUrl + '/getMemFlow',// 照片下部客流信息

    "getPayMemFlow" : baseUrl + '/getPayMemFlow',// 照片下部客流信息
    "getPayMemFlowHour" : baseUrl + '/getPayMemFlowHour',// 照片下部客流信息
    

    //顾客中心
    "getMemInfo": baseUrl+'/getMemInfo',   //单个用户
    "getLine1": baseUrl+'/getLine1', //单折线图
    "getPie": baseUrl+'/getPie', //饼图
    "getBar": baseUrl+'/getBar', //柱状图
    // "monthSort": baseUrl+'/monthSort', //月度消费排名  作废
    "getMsg": baseUrl+'/getMsg',//提示  （没变）
    // "getTicketInfo" : baseUrl + '/getTicketInfo',// 消费小票
    "getTicketinfo" : baseUrl3 + '/getTicketinfo',// 消费小票 2018-07-19更改小票接口
    
    "getMonthReport": baseUrl3+'/getMonthReport', //月度消费排名  新的
    "getYearReport" : baseUrl3 + '/getYearReport',// 年度消费排名

    //数据概览页面
    "getStoreMapSaleData" : baseUrl + '/getStoreMapSaleData', //店铺地图
    "getVenderSaleSort" : baseUrl + '/getVenderSaleSort',   // 当日门店销售排行榜
    "getStoreSaleSort" : baseUrl + '/getStoreSaleSort',  // 今日商品销售排行榜
    "seeSaleToday" : baseUrl + '/seeSaleToday',    //当日销售概览
    "seeMemCount" : baseUrl + '/seeMemCount',  //会员概览
    "payStyleType" : baseUrl + '/payStyleType', //收银方式
    "getAllYibiaoPan" : baseUrl3 + '/getAllYibiaoPan',// 同比及客单价

    //店铺数据 
    "getSaleIncomeToday" : baseUrl + '/getSaleIncomeToday', //当日销售收入概览
    "getSaleTimeQuantum" : baseUrl + '/getSaleTimeQuantum', //分时段销售金额 (今日/昨日) 
    "getFlowUserCgToday" : baseUrl + '/getFlowUserCgToday', //今日客流转化情况
    "getFlowEveryTimes" : baseUrl + '/getFlowEveryTimes', //今日门店客流分时走势
    "getFlow7Days" : baseUrl + '/getFlow7Days', //近7日内客流趋势
    "getSale7Days" : baseUrl + '/getSale7Days', //近7日销售金额趋势   
    "getSaleVip30Days" : baseUrl + '/getSaleVip30Days', //近30日会员购买次分布  
    "getNewOldToday" : baseUrl + '/getNewOldToday', //今日新老顾客到店
    "getAvgPriceToday" : baseUrl + '/getAvgPriceToday', //今日平均客单价
    "getTop10Today" : baseUrl + '/getTop10Today', //今日热卖商品TOP10
    
    //门店概览
    "getStoreMapShow" : baseUrl + '/getStoreMapShow', //门店概览列表
    "getStoreByRole" : baseUrl + '/getStoreByRole', //门店概览列表2  role_rank != 0
    
    
    
    // 登陆  
    "login" : baseUrl2 + '/usermanage/login', //门店概览列表


    //角色管理
    "roleMmanagelist" : baseUrl2 + '/rolemmanage/roleMmanagelist', //角色列表
    "likeroleMmanagelist" : baseUrl2 + '/rolemmanage/likeroleMmanagelist', //角色列表搜索
    "Role_del" : baseUrl2 + '/rolemmanage/del', //删除

    "role_treedata_one" : baseUrl2 + '/storemanage/StoreAllRanklist', //树状列表  第一个
    "role_treedata_one_edit" : baseUrl2 + '/storemanage/StoreAllRanklist2', //树状列表  第一个
    
    "role_treedata" : baseUrl2 + '/rolemmanage/treedata', //树状列表  下边俩个模块
    

    "role_add_H_A_C" : baseUrl2 + '/rolemmanage/add', //添加 
    "role_upt_H_A_C" : baseUrl2 + '/rolemmanage/upt', //添加 
    "getrolerank" : baseUrl2 + '/rolemmanage/getrolerank' , //角色等级查询
    "fatherrolerank" : baseUrl2 + '/rolemmanage/role_rank' , //角色父级等级查询

    // 门店管理
    "Storemanagelist" : baseUrl2 + '/storemanage/Storemanagelist', //店面列表
    "Storemanagelike" : baseUrl2 + '/storemanage/Storemanagelike', //列表搜索
    "rankQuery" : baseUrl2 + '/storemanage/rankQuery', //列表搜索
    "Store_upt" : baseUrl2 + '/storemanage/upt', //修改
    "Store_del" : baseUrl2 + '/storemanage/del', //删除
    "Store_add" : baseUrl2 + '/storemanage/add', //添加
    "StoreRanklist" : baseUrl2 + '/storemanage/StoreRanklist', //查看

    "getStoreIds" : baseUrl + '/getStoreIds',     //搜StoreId
    "chkStoreExist" : baseUrl + '/chkStoreExist',     //搜StoreId
    

    
    // 用户管理
    "Usermanagelist" : baseUrl2 + '/usermanage/Usermanagelist', //用户列表
    "Usermanagelike" : baseUrl2 + '/usermanage/Usermanagelike', //列表搜索
    "User_add" : baseUrl2 + '/usermanage/add', //添加
    "User_upt" : baseUrl2 + '/usermanage/upt', //修改
    "User_del" : baseUrl2 + '/usermanage/del', //单个删除
    "User_listdel" : baseUrl2 + '/usermanage/listdel', //批量删除
    "User_role" : baseUrl2 + '/rolemmanage/roleMmanageRanklist', //用户 角色查询列表
    
    // 系统日志
    "logmanagelist" : baseUrl2 + '/logmanage/logmanagelist', //列表
    "likelogmanagelist" : baseUrl2 + '/logmanage/likelogmanagelist', //列表
    "System_upt" : baseUrl2 + '/logmanage/upt', //修改
    
    // 登陆人的权限
    "querytreedata" : baseUrl2 + '/rolemmanage/querytreedata', // 登陆人的权限

    // 重置密码
    "emailjubge" : baseUrl2 + '/usermanage/emailjubge', // 判断邮箱存不存在
    "phonejubge" : baseUrl2 + '/usermanage/phonejubge', // 判断手机号存不存在
    
    "getVerify" : baseUrl2 + '/email_phone/getVerify', // 生成验证码图片
    "checkVerify" : baseUrl2 + '/email_phone/checkVerify', // 验证图片 验证码
    
    "getsendemail" : baseUrl2 + '/email_phone/getsendemail', // 邮箱发送验证码
    "getsendmoblie" : baseUrl2 + '/email_phone/getsendmoblie', // 手机发送验证码
    
    "emailcode" : baseUrl2 + '/usermanage/emailcode', // 邮箱验证  验证码 判断
    "phonecode" : baseUrl2 + '/usermanage/phonecode', // 手机验证  验证码 判断

    "user_query" : baseUrl2 + '/usermanage/query', // 用户


    // 黑名单模块 S  qianzhuang接口
    // 黑名单库->查询黑名单列表 
    "blacklist_list" : baseUrl4 + '/api/blacklist/list', // 黑名单库列表
    // 黑名单库 -> 删除黑名单信息
    "blacklist_del"  : baseUrl4 + '/api/blacklist/del',  //删除黑名单信息
    // 黑名单库-> 查询单个黑名单信息
    "blacklist_find" : baseUrl4 + '/api/blacklist/find', //查询单个黑名单信息
    // 抓取照片-> 查询-浏览抓拍照片记录
    "usercomein_list" : baseUrl4 + '/api/usercomein/list', // 查询
    // 抓取照片-> 加入黑名单
    "blacklist_add" : baseUrl4 + '/api/blacklist/add', // 添加到黑名单
    // 抓取照片-> 删除照片
    "usercomein_del" : baseUrl4 + '/api/usercomein/del', //删除照片
    
    // 黑名单模块  End
    
    
    
    //  // 黑名单 测试调金王接口 start
     
     // 黑名单库
    //  "blacklist_list" : baseUrl4 + '/api/black/list', // 黑名单库列表
    //  "blacklist_del" : baseUrl4 + '/api/black/del', // 黑名单库删除
    //  "browse_blackAdd" : baseUrl4 + '/api/black/add', // 加入黑名单
    //  // 黑名单库-> 查询单个黑名单信息
    // "blacklist_find" : baseUrl4 + '/blacklist/find', //查询单个黑名单信息
    // // 抓取照片-> 查询-浏览抓拍照片记录
    // "usercomein_list" : baseUrl4 + '/api/usercomein/list', // 查询
    // // 抓取照片-> 删除照片
    // "usercomein_del" : baseUrl4 + '/api/usercomein/del', //删除照片

     // 黑名单 测试调金王接口 End
    
}