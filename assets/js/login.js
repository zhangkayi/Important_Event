$(function() {
    let form = layui.form
    let layer = layui.layer

    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义密码的验证规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repass: function(value) {
            let repwd = $('.reg-box [name=repassword]').val()
            if (value !== repwd) {
                return layer.msg('两次密码输入不一致')
            }
        }

    })

    // 监听登录表单的注册事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功，请登录')
                    // 模拟人的点击行为
                $('#link_login').click()
            }
        })
    })


    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })


})