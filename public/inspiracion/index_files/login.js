/* global Utils */

'use strict';
$(function () {
    $(document).ready(function () {
        $("#ajaxError").modal({
            show: false,
            backdrop: 'static'
        });
        $("#loaders").hide();
        loginApp.getInfoCliente();
    });
});

var loginData = {
    contextName: '',
    messageSubmit: {
        messageText: ''
    },
    privateData: {
        email: '',
        password: '',
        ridCliente: ''
    },
    dataErrores: {
        login: {
            emailError: '',
            passwordError: '',
            accesoError: ''
        },
        internalErrors: []
    },
    variables: {
        isFocusFirst: false,
        errorAjax: {
            statusErrorAjax: '',
            textErrorAjax: '',
            origenErrorAjax: ''
        }
    }
};

var loginApp = new Vue({
    el: '#loginForm',
    data: loginData,
    methods: {
        getInfoCliente: function () {
            $.ajax({
                url: this.getUrlEncoded('/facturacion/rest/Cliente/Propiedades'),
                dataType: 'json',
                type: 'GET',
                beforeSend: function () {
                    $("#loaders").show();
                },
                complete: function () {
                    $("#loaders").hide();
                },
                success: function (response) {
                    if (response.error) {
                        loginApp.addInternalError(response.error);
                        return;
                    }
                    loginData.privateData.ridCliente = response.result.ridCliente;
                    loginData.contextName = response.result.contextName;
                },
                error: function (error, exception) {
                    loginData.variables.errorAjax.origenErrorAjax = "Información del Cliente";
                    loginApp.showErrorAjax(error, exception);
                }

            });
        },
        acceder: function () {
            $.ajax({
                url: this.getUrlEncoded('/facturacion/rest/Acceder'),
                data: JSON.stringify(loginData.privateData),
                contentType: 'application/json',
                dataType: 'json',
                method: 'POST',
                beforeSend: function () {
                    $("#loaders").show();
                },
                complete: function () {
                    $("#loaders").hide();
                },
                success: function (response) {
                    if (response.errors) {
                        loginApp.getErrores(response.errors);
                        loginData.messageSubmit.messageText = response.error;
                    }
                    else {
                        loginData.messageSubmit.messageText = response.message;
                        loginApp.redirect(response.result.isAdmin);
                    }
                    $('body, html').animate({scrollTop: $('#top').offset().top}, 'slow');
                },
                error: function (error, exception) {
                    loginData.variables.errorAjax.origenErrorAjax = "Intentar ingresar";
                    loginApp.showErrorAjax(error, exception);
                }
            });
        },
        getErrores: function (errors) {
            loginData.dataErrores.login.emailError = errors.email;
            loginData.dataErrores.login.passwordError = errors.pass;
            loginData.dataErrores.login.accesoError = errors.acceso;
        },
        redirect: function (isAdmin) {
            var url;
            if(isAdmin){
                url = "/facturacion/" + loginData.contextName + "site/admin/cliente.jsp";
            }else{
                url = "/facturacion/" + loginData.contextName + "m/site/index.jsp";
            }
            window.location = this.getUrlEncoded(url);
        },
        getUrlEncoded: function (url) {
            url = Utils.encodeURL(url);
            if(!this.cookiesAvailable() && url.indexOf("jsessionid=") === -1){
                var id = $('#jsid').val();
                var encoded = ";jsessionid=" + id;
                url = url + encoded;
            }
            return url;
        },
        cookiesAvailable: function () {
            try {
                document.cookie = 'cookietest=1';
                var ret = document.cookie.indexOf('cookietest=') !== -1;
                document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
                return ret;
            } catch (e) {
                return false;
            }
        },
        cerrarErrorAjax: function () {
            $("#ajaxError").modal("hide");
            for (var variable in this.variables.errorAjax) {
                this.variables.errorAjax[variable] = '';
            }
        },
        showErrorAjax: function (error, exception) {
            loginData.variables.errorAjax.statusErrorAjax = error.status;
            if (error.status === 0) {
                loginData.variables.errorAjax.textErrorAjax = 'No conectado. Verifica tu conexión.';
                if (exception === 'timeout') {
                    loginData.variables.errorAjax.textErrorAjax = 'Se ha interrumpido la conexión con el servidor. Verifica tu conexión.';
                }
            } else if (error.status === 404) {
                loginData.variables.errorAjax.textErrorAjax = '[404] Recurso no encontrado. Contacte a su proveedor';
            } else if (error.status === 500) {
                loginData.variables.errorAjax.textErrorAjax = '[500] Error interno del servidor. Recargue la página si el error persiste contacte a su proveedor';
            } else if (error.status === 502) {
                loginData.variables.errorAjax.textErrorAjax = '[502] La petición fue cancelada. Intente nuevamente, si el error persiste contacte a su proveedor';
            } else if (error.status === 503) {
                loginData.variables.errorAjax.textErrorAjax = '[503] El servidor está congestionado o se encuentra en mantenimiento. Por favor intente nuevamente más tarde.';
            } else if (exception === 'parsererror') {
                loginData.variables.errorAjax.textErrorAjax = 'Se obtuvo una respuesta con formato incorrecto. Contacte a su proveedor';
            } else if (exception === 'timeout') {
                loginData.variables.errorAjax.textErrorAjax = 'Timeout. El tiempo de espera expiró. Vuelva intentarlo, si obtiene el mismo resultado contacte a su proveedor.';
            } else if (exception === 'abort') {
                loginData.variables.errorAjax.textErrorAjax = 'La petición fue abortada, intente de nuevo.';
            } else {
                loginData.variables.errorAjax.textErrorAjax = 'Error inesperado.' + error.responseText;
            }
            $("#ajaxError").modal("show");
        },
        addInternalError: function (errorMessage) {
            this.dataErrores.internalErrors.push({
                message: errorMessage
            });
        }
    },
    computed: {
        respuesta: function () {
            return this.messageSubmit.messageText;
        },
        errores: function () {
            for (var error in this.dataErrores.login) {
                if (this.dataErrores.login[error]) {
                    return true;
                }
            }
            return false;
        },
        isInternalErrors: function () {
            if ((this.dataErrores.internalErrors).length > 0) {
                return true;
            }
            return false;
        }
    },
    watch: {
        errores: function (hayErrores) {
            if (!hayErrores) {
                this.messageSubmit.messageText = '';
            }
        },
        'privateData.email': function () {
            this.dataErrores.login.emailError = '';
            this.dataErrores.login.accesoError = '';
        },
        'privateData.password': function () {
            this.dataErrores.login.passwordError = '';
            this.dataErrores.login.accesoError = '';
        }
    },
    mounted: function () {
        if (!this.variables.isFocusFirst) {
            this.variables.isFocusFirst = true;
            $('[autofocus="autofocus"], [autofocus="true"]').focus();
            $('form:first *:input[type!=hidden]:first').focus();
        }
    }
});
