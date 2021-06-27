module.exports = function () {

    this.alwaysfalse = (email) => {
        return false
    },

        this.feature2 = (data) => {
            const { email = null } = data
            return email === "jasonczx27@gmail.com" ? true : false
        },

        this.feature3 = (data) => {
            const { email = null } = data
            return email === "youversion@bible.org" ? true : false
        },
        this.gmail = (data) => {
            const { email = null } = data
            return email && new RegExp("@gmail").test(email) ? true : false
        },
        this.yahoo = (data) => {
            const { email = null } = data
            return email && new RegExp("@yahoo").test(email) ? true : false
        },
        this.icloud = (data) => {
            const { email = null } = data
            return email && new RegExp("@icloud").test(email) ? true : false
        },
        this.freefeature = () => {
            return true
        }



}
