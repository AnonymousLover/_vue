<template>
    <v-pop v-model="showModal">
        <div class="popup">
            <div class="popup-head" v-if="title">
                <h3 class="popup-title" v-html="title"/>
                <h5 class="popup-sub-title" v-if="subTitle" v-html="subTitle"/>
            </div>
            <div class="popup-body">
                <slot>{{ content }}</slot>
            </div>
            <div class="popup-btns" v-if="btnList">
            <span class="btn"
                  v-for="(b, i) in btnList"
                  :key="i"
                  :class="b.type||'btn-default'"
                  @tap="close(i)"
                  v-html="b.text"/>
            </div>
        </div>
    </v-pop>
</template>
<script type="text/babel">
    import _modal from '../mixins/modal'
    export default {
        mixins : [_modal],
        props  : {
            title   : '',
            subTitle: '',
            content : {
                default: ''
            },
            btnList : {
                default: []
            }
        },
        methods: {
            close(idx) {
                this.click && this.click(idx);
            }
        }
    }
</script>
