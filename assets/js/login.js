$(function () {
    //1、点击去注册账号，隐藏登录区域，显示注册区域
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //2、点击去登录，显示登录区域，隐藏注册区域
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //3、自定义验证规则
    var form = layui.form;
    form.verify({
        //密码规则
        pwdLength: [
            /^[\S]{6,16}$/, "密码必须6-16位，且不能输入空格"
        ],
        //确认密码规则
        repassword: function (value) {
            //选择器必须带空格，选择的是后代中的input，name属性值为password的哪一个标签
            let pwdLength = $(".reg-box input[name=password]").val();
            //比较
            if (value !== pwdLength) {
                return "两次输入的密码不一致";
            }
        }
    });


    //4、注册用户
    let layer = layui.layer;
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        //ajax
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $(".reg-box input[name=username]").val(),
                password: $(".reg-box input[name=password]").val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('恭喜您注册成功，请登录！', { icon: 6 });
                $('#form-reg')[0].reset();
                $('#link_login').click();
            }
        })
    })

    //5、登录
    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('用户名或密码错误', { icon: 5 })
                }
                layer.msg('登录成功！', { icon: 6 });
                location.href = "/index.html";
                localStorage.setItem('twoToken', res.token);
            }
        })
    })

})