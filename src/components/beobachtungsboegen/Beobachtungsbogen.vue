<template>
    <div class="beobachtungsbogen" :key="`rerenderer-${rerender}`">
        <h1> {{ kind }} </h1>
        <div v-for="(bildungsbereich, name) in bildungsbereiche" :key="name" class="bildungsbereich">
            <h2 class="bereichTitle" 
            :class="{
                eins: (name === 'Hören, Sehen, Verstehen'), 
                zwei: (name === 'Sprechen'), 
                drei: (name === 'Bewegung, Geschicklichkeit'), 
                vier: (name === 'Körperkontrolle'),
                fünf: (name === 'Emotionalität, Soziales Miteinander' ),
                sechs: (name === 'Denken')}" 
            >
                {{name}}
            </h2>
            <div v-for="eintrag in bildungsbereich" :key="eintrag.id" @click="toggleEintragClr(name, eintrag.id)" class="eintrag"
                :class="{
                    eins: ( name === 'Hören, Sehen, Verstehen'), 
                    zwei: (  name === 'Sprechen'), 
                    drei: (  name === 'Bewegung, Geschicklichkeit'), 
                    vier: (  name === 'Körperkontrolle'),
                    fünf: (  name === 'Emotionalität, Soziales Miteinander' ),
                    sechs: ( name === 'Denken'),
                    nichtErfuellt: (eintrag['erfüllt'] === 0 || !eintrag['erfüllt']),
                    teilsErfuellt: (eintrag['erfüllt'] === 1),
                    vollErfuellt: (eintrag['erfüllt'] === 2),
                    change: change
                }" >
                <span class="id"> {{ eintrag.id }} </span>
                <span class="beschreibung" v-if="showBeschreibungen"> {{ eintrag.beschreibung }} </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Beobachtungsbogen",
    data() {
        return {
            rerender: 0,
            kindData: {}
        }
    },
    props: {
        kind: String,
        bildungsbereiche: Object,
        showBeschreibungen: Boolean,
        change: Boolean,
    },
    async mounted(){
        for(const bildungsbereich of Object.entries(this.bildungsbereiche)){
            for(let eintrag of Object.entries(bildungsbereich)){
                eintrag["erfüllt"] = 0
            }
        }
        try {
            await fetch(`https://beobachtungsboegen.herokuapp.com/child/${this.kind}`, {
                method: "GET",
                Authorization: `Bearer ${this.$session.get("accessToken")}`
            })
            .then(res => console.log(res))
            .then(data => this.kindData = data)
            console.log(this.kindData)
        } catch(e) {
           console.log(e) 
        }
    },
    methods: {
        toggleEintragClr(name, id){
            if(!this.change){return 0}
            let entry = this.bildungsbereiche[name].find(e => e['id'] === id)['erfüllt']
            if(entry){
                switch(entry){
                    case 0: this.bildungsbereiche[name].find(e => e['id'] === id)['erfüllt'] = 1; break;
                    case 1: this.bildungsbereiche[name].find(e => e['id'] === id)['erfüllt'] = 2; break;
                    case 2: this.bildungsbereiche[name].find(e => e['id'] === id)['erfüllt'] = 0; break;
                }
            } else {
                this.bildungsbereiche[name].find(e => e['id'] === id)['erfüllt'] = 1;
            }
            this.rerender +=1;
        }
    }
}
</script>

<style>

</style>

<style scoped>
* {
    --clr-bb-000: white;
    --clr-bb-100: red;
    --clr-bb-200: lightgreen;
    --clr-bb-300: orange;
    --clr-bb-400: blue;
    --clr-bb-500: pink;
    --clr-bb-600: lightblue;
}
.eins {
    --clr-bb-eintrag: var(--clr-bb-100);
}
.zwei {
    --clr-bb-eintrag: var(--clr-bb-200);
}
.drei {
    --clr-bb-eintrag: var(--clr-bb-300);
}
.vier {
    --clr-bb-eintrag: var(--clr-bb-400);
}
.fünf {
    --clr-bb-eintrag: var(--clr-bb-500);
}
.sechs {
    --clr-bb-eintrag: var(--clr-bb-600);
}
.bereichTitle {
    background-color: var(--clr-bb-eintrag);
}

.nichtErfuellt {
    --clr-bb-eintrag: var(--clr-bb-000);
}
.teilsErfuellt {
    position: relative;
    overflow: hidden;
    background: linear-gradient( .125turn, var(--clr-bb-eintrag) 0%, var(--clr-bb-eintrag) 50%, var(--clr-bb-000) 50%, var(--clr-bb-000) 100%) !important;
}











.eintrag {
    background: var(--clr-bb-eintrag);
    display: inline-block;
    font-weight: bold;
    padding: 5px;
    margin: .25ch;
    border: 1px solid black;
    border-radius: 3px;
    vertical-align: top;
    user-select: none;
    min-width: 3ch;
    text-align: center;
}
.change{
    cursor: pointer;
}
.bildungsbereich {
    display: inline-block;
    max-width: 40ch;
    border: 1px solid transparent;
}
.beschreibung {
    font-size: .7rem;
}
</style>