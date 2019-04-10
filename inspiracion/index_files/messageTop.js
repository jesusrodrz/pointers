

var templateVar = '<div class="row spacing-five-top" v-if="hayRespuesta">\
                        <div v-bind:class="[hayErrores ? \'alert-danger\' : \'alert-success\']"\n\
                            class="alert text-center" style="margin-bottom: 0px">\
                                {{message}}\
                        </div>\
                    </div>';

Vue.component('messageAlert', {
    template: templateVar,
    props: ['message', 'hayRespuesta', 'hayErrores']
});

