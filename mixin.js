export const translate = {
    methods: {
        translate(phrase) {
            if (store.state.language === 'EN') {
                return this.translates[phrase][0]
            } else if (store.state.language === 'UA') {
                return this.translates[phrase][1]
            } else if (store.state.language === 'RU') {
                return this.translates[phrase][2]
            }
        },
    }
}

export const showHidePassword = {
    methods: {
        showHidePassword(e, id) {
            if (document.getElementById(id).getAttribute('type') === 'password') {
                e.target.classList.add('view')
                document.getElementById(id).setAttribute('type', 'text')
            } else {
                e.target.classList.remove('view')
                document.getElementById(id).setAttribute('type', 'password')
            }
            return false
        }
    }
}

export const currentTabs = {
    methods: {
        currentTabs() {
            store.commit('currentTab', '')
        }
    }
}
