/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region 登录窗校验
var id_is_legal = false;
var pwd_is_legal = false;
var id_reg = new RegExp('^[0-9]{7}$');
var password_reg = new RegExp('^[a-zA-Z0-9]{6,12}$');

$('#jobNumber').change(function () {
    if (!id_reg.test($('#jobNumber').val())) {
        id_is_legal = true;
        $('#tip').text("请输入正确格式的工号");
        $('#tip').css('display', 'block');
    } else {
        id_is_legal = true;
        $('#tip').css('display', 'none');
    }
});
$('#password').change(function () {
    if (!password_reg.test($('#password').val())) {
        pwd_is_legal = true;
        $('#tip').text("请输入正确格式的密码");
        $('#tip').css('display', 'block');
    } else {
        pwd_is_legal = true;
        $('#tip').css('display', 'none');
    }
});

function validate() {
    if (id_is_legal == true && pwd_is_legal == true) {
        return true;
    } else {
        return false;
    }
}

//#endregion

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region 三种不同情况登录、首次登陆更改初始密码

//普通登录
$('#loginBtn').click(function () {
    if (validate()) {
        var transData = {
            'jobNumber': $('#jobNumber').val(),
            'password': $('#password').val()
            // 'jobNumber': '2',
            //  'password': '123456'
        }
        $.ajax({                            //url待改
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(transData),
            url: '/doLogin',
            success: function (result) {
                if (result.resultCode == 0) {
                    alert('登录成功，欢迎您...');
                    //看权限
                    var data = result.data;
                    var authority = data.authority;

                    var userName = encodeURIComponent(data.userName);
                    //工号
                    var id = encodeURIComponent(data.jobNumber);
                    if (authority == 1) {
                        window.location = '/common1?userName=' + userName + "&id=" + id;
                    }
                    if (authority == 2) {
                        window.location = '/common2?userName=' + userName + "&id=" + id;
                    }

                    if (authority == 3) {
                        window.location = '/common3?userName=' + userName + "&id=" + id;
                    }
                    if (authority == 4) {
                        window.location = '/common4?userName=' + userName + "&id=" + id;
                    }
                    if (authority == 5) {
                        window.location = '/common5?userName=' + userName + "&id=" + id;
                    }
                } else if (result.resultCode == -1) {
                    /*for(let i = 0; i < result.WorkcellList.length; i++){
                        $('#Workcell').append('<option value="' + result.WorkcellList[i]
                            + '">' + result.WorkcellList[i] + '</option>');
                    }*/
                    alert(result.description);
                   /* $('#chooseWorkcellModal').modal('show');
                    $('#chooseWorkcellModal').modal('show');*/
                } else if (result.Status == 'first') {     //用户首次登录，需更改初始密码
                    $('#setPwModal'), modal('show');
                } else {
                    alert('登录失败，请稍后重试...');
                }
            },
            error: function () {
                alert('登录失败，请稍后重试...');
            }
        })
    }
})

//选择工作部门后登录
$('#workcellSubmitBtn').click(function () {
    var transData = {
        'UserID': $('#UserID').val(),
        'Password': $('#Password').val(),
        'Workcell': $('Workcell').val()
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(transData),
        url: '',                                   //url待改
        success: function (result) {
            if (result.Status == 'success') {
                window.location = '';              //url待改
            } else if (result.Status == 'first') {     //用户首次登录，需更改初始密码
                $('#setPwModal'), modal('show');
            } else {
                alert('登录失败，请稍后重试...');
            }
        },
        error: function () {
            alert('登录失败，请稍后重试...');
        }
    })
})

//注册
$('#registerBtn').click(function () {
    $('#addRegisterModal').modal('show');
})
//点击注册
$('#AddBtn').click(function () {
    // if(validate()){
    if ($('#jobNumber1').val() == "" || $('#jobNumber1').val() == null) {
        $('#tip1').text("工号不能为空");
        $('#tip1').css('display', 'block');
        return;
    }
    if ($('#userName').val() == "" || $('#userName').val() == null) {
        $('#tip1').text("姓名不能为空");
        $('#tip1').css('display', 'block');
        return;
    }
    if ($('#password1').val() == "" || $('#password1').val() == null) {
        $('#tip1').text("密码不能为空");
        $('#tip1').css('display', 'block');
        return;
    }
    if ($('#department').val() == "" || $('#department').val() == null) {
        $('#tip1').text("部门不能为空");
        $('#tip1').css('display', 'block');
        return;
    }
    if (!id_reg.test($('#jobNumber1').val())) {
        $('#tip1').text("工号长度必须为7位");
        $('#tip1').css('display', 'block');
        return;
    }
    if (!password_reg.test($('#password1').val())) {

        $('#tip1').text("请输入正确格式的密码");
        $('#tip1').css('display', 'block');
        return;
    }
    $('#tip1').css('display', 'none');
    var transData = {
        'jobNumber': $('#jobNumber1').val(),
        'password': $('#password1').val(),
        'mailAddress': $('#mailAddress').val(),
        'authority': $('#authority').val(),
        'department': $('#department').val(),
        'userName': $('#userName').val()
    }
    $.ajax({                            //url待改
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(transData),
        url: '/doRegister',
        success: function (result) {
            if (result.resultCode == 0) {
                alert('注册成功，欢迎您登录...');
                window.location = '/fms';              //url待改

            } else if (result.resultCode == -1) {
                alert('注册失败，请稍后重试...');
            } else {
                alert('注册失败，请稍后重试...');
            }
        },
        error: function () {
            alert('注册失败，请稍后重试...');
            window.location = '/fms';
        }
    })
    // }
})
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region 首次登录更改初始密码

//输入框验证
var is_password_legel = false;
var is_rePassword_legal = false;
var password_reg = new RegExp('^[a-zA-Z0-9]{6,12}$');
$('#newPassword').change(function () {
    if (!password_reg.test($(this).val())) {
        is_password_legel = false;
        $(this).parent().parent().attr('class', 'form-group has-error has-feedback');
        $(this).parent().children('span').remove();
        $(this).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
    } else {
        is_password_legel = true;
        $(this).parent().parent().attr('class', 'form-group has-success has-feedback');
        $(this).parent().children('span').remove();
        $(this).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
    }
});

$('#rePassword').change(function () {
    if ($(this).val() != $('#newPassword').val()) {
        is_rePassword_legel = false;
        $(this).parent().parent().attr('class', 'form-group has-error has-feedback');
        $(this).parent().children('span').remove();
        $(this).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
    } else {
        is_rePassword_legel = true;
        $(this).parent().parent().attr('class', 'form-group has-success has-feedback');
        $(this).parent().children('span').remove();
        $(this).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
    }
});

//点击提交
$('#newPwBtn').click(function () {
    var transData = {
        'UserID': $('#UserID').val(),
        'NewPassword': $('#newPassword').val()
    };
    if (is_password_legel && is_rePassword_legal) {
        /*$.ajax({
              type: 'POST',
              dataType: 'JSON',
              contentType: 'application/json',
              data: JSON.stringify(transData),
              url: '',                                   //url待改
              success: function(result){
                  if(result.Status == 'success'){
                      window.location = '';              //url待改
                  }
                  else{
                      alert('登录失败，请稍后重试...');
                  }
              },
              error: function(){
                  alert('登录失败，请稍后重试...');
              }
          }) */
    }
})
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region 申请重置密码（模态窗）
$('#resetPassword').click(function () {
    $('#resetPwModal').modal('show');
});

var _id_is_legal = false;
var email_is_legal = false;
var valiNum_is_legal = false;
var email_reg = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$');
var valiNum_reg = new RegExp('^[0-9]{4}$');

$('#_UserID').change(function () {
    if (!id_reg.test($(this).val())) {
        _id_is_legal = true;
        $('#_tip').text("请输入正确格式的工号");
        $('#_tip').css('display', 'block');
    } else {
        _id_is_legal = true;
        $('#_tip').css('display', 'none');
    }
});

$('#Email').change(function () {
    if (!email_reg.test($(this).val())) {
        email_is_legal = false;
        $('#_tip').text("请输入正确格式的邮箱");
        $('#_tip').css('display', 'block');
    } else {
        email_is_legal = true;
        $('#_tip').css('display', 'none');
    }
});

//点击获取验证码按钮的事件
$('#getNum').click(function () {
    if (_id_is_legal && email_is_legal) {
        var time = 60;    //60s内不可重复获取验证码
        $(this).attr('disabled', 'disabled');

        var json_data = {     //构造json
            'UserID': $('#_UserID').val(),
            'Email': $('#Email').val()
        };
        $.ajax({              //向后端发送工号与该工号的绑定邮箱（json）
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(json_data),
            url: '',           //后端action
            success: function (result) {
                if (result.Status == 'error')
                    alert('您未绑定该邮箱，请检查邮箱填写或直接联系管理员');
            }
        });

        var timer = setInterval(function () {
            if (time == 0) {
                $('#getNum').removeAttr('disabled');
                $('#getNum').html('再次获取');
                clearInterval(timer);
            } else {
                $('#getNum').html(time + '秒后可再次获取');
                time--;
            }
        }, 1000);
    }
});

$('#valiNum').change(function () {
    if (!valiNum_reg.test($(this).val())) {
        valiNum_is_legal = false;
        $('#_tip').text("请输入正确格式的验证码");
        $('#_tip').css('display', 'block');
    } else {
        valiNum_is_legal = true;
        $('#_tip').css('display', 'none');
    }
});

//点击提交申请按钮事件
$('#valiBtn').click(function () {
    if (_id_is_legal && email_is_legal && valiNum_is_legal) {
        var json_data = {
            'UserID': $('#_UserID').val(),
            'Email': $('#Email').val(),
            'ValiNum': $('#valiNum').val()
        };
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(json_data),
            url: '',           //后端action
            success: function (result) {
                if (result.Status == 'success') {
                    alert('已成功向管理员提交重置密码申请，请耐心等待通知！');
                } else {
                    alert('申请提交失败，请自行告知管理员...');
                }
            }
        });
    }
});
//#endregion


