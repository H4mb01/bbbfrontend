export default {
    authenticate: async function() {
        let auth = false
        if (this.$session.get('accessToken')) {
            console.log("trying to authenticate...")
            try {
                await fetch("https://beobachtungsboegen.herokuapp.com/auth", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.$session.get('accessToken')}`
                    }
                })
                .then(res => res.json())
                .then(data => auth = data.auth)
            } catch {
                console.log("accessToken expired")
            }
        }
        if(!auth && this.$session.get('refreshToken')){
            console.log("not authenticated, trying to refresh jwt-token")
            try {
                await fetch("https://beobachtungsboegen.herokuapp.com/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "token": this.$session.get('refreshToken')
                    })
                })
                .then(res => res.json())
                .then(data => {
                    this.$session.set('accessToken', data.accessToken)
                    console.log("got new accessToken")
                })
                await fetch("https://beobachtungsboegen.herokuapp.com/auth", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.$session.get('accessToken')}`
                    }
                })
                .then(res => res.json())
                .then(data => auth = data.auth)
            } catch {
                console.log("wrong refreshToken")
            }
        }
        if (!auth){
            console.log("you are not authenticated")
            this.$router.push("/login")
        } else {
            console.log("you are authenticated")
        }
        return auth
    },
    logout: async function () {
        console.log("logging out", this.$session.get('username'))
        await fetch("https://beobachtungsboegen.herokuapp.com/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.$session.get('username')
            })
        })
        this.$session.remove("username")
        this.$session.remove("accessToken")
        this.$session.remove("refreshToken")
        this.$router.push("/")
    },
}