

var templateVar = '<div v-if="isInternalErrors " class="row content-internal-errors">\
                        <div v-for="error in errors" class="internal-error">\
                            &bull; {{error.message}}\
                        </div>\
                        <div style="padding: 0px 10px;">\
                            &raquo; Si no puede finalizar su proceso debido al inconveniente, comuníquese con su proveedor.\
                        </div>\
                    </div>';

Vue.component('internalErrors', {
    template: templateVar,
    props: ['errors', 'isInternalErrors']
});

