/*!
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import Vue, { VNode } from 'vue'
import { BackendToFrontend, FrontendToBackend, VsCode } from './activation'

declare const vscode: VsCode<FrontendToBackend>

export const Component = Vue.extend({
    data() {
        return {
            msg: 'Hello',
        }
    },
    created() {
        window.addEventListener('message', ev => {
            const data = ev.data as BackendToFrontend
            this.msg = data.newText
        })
    },
    methods: {
        // need annotation due to `this` in return type
        greet(): string {
            return this.msg + ' world'
        },
        alertBackend() {
            vscode.postMessage({ messageText: 'hello world' })
        },
    },
    computed: {
        // need annotation
        greeting(): string {
            return this.greet() + '!'
        },
    },
    // `createElement` is inferred, but `render` needs return type
    template: '<div> {{ this.greeting }} <button v-on:click="alertBackend">Click me!</button> </div>',
})

new Vue({
    el: '#vueApp',
    render: (createElement): VNode => {
        return createElement(Component)
    },
})
