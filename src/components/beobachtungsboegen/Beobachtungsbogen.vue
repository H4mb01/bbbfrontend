<template>
    <div class="beobachtungsbogen" :class="{
        overview: (mode === 'overview'),
        edit: (mode === 'edit')
    }" :key="`rerenderer-${kindID}-${rerender}`">
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
                    nichtErfuellt: (eintrag['erfuellt'] === 0 || !eintrag['erfuellt']),
                    teilsErfuellt: (eintrag['erfuellt'] === 1),
                    vollErfuellt: (eintrag['erfuellt'] === 2),
                    change: change
                }" >
                <span class="id"> {{ eintrag.id }} </span>
                <span class="beschreibung" v-if="showBeschreibungen"> {{ eintrag.beschreibung }} </span>
            </div>
        </div>
    </div>
</template>

<script>
import jsondata from "../../json/bildungsbereiche.json"

export default {
    name: "Beobachtungsbogen",
    data() {
        return {
            rerender: 0,
            kindData: {},
            bildungsbereiche: JSON.parse(JSON.stringify(jsondata.Bildungsbereiche)),
            showBeschreibungen: false,
            change: false,
        }
    },
    props: {
        kind: String,
        observations: Object,
        kindID: String,
        mode: String
    },
    async mounted(){
        console.log(this.bildungsbereiche)
        console.log(this.observations)
        for(let [, bildungsbereich] of Object.entries(this.bildungsbereiche)){
            bildungsbereich.forEach(element => {
                if(this.observations[element.id]){
                    element['erfuellt'] = this.observations[element.id]
                } else {
                    element['erfuellt'] = 0
                }
            });
        }
        if(this.mode==="edit"){
            this.showBeschreibungen = true
            this.change = true
        }
        this.rerender +=1
    },
    methods: {
        toggleEintragClr(name, id){
            if(!this.change){return 0}
            let entry = this.bildungsbereiche[name].find(e => e['id'] === id)['erfuellt']
            if(entry){
                switch(entry){
                    case 0: this.bildungsbereiche[name].find(e => e['id'] === id)['erfuellt'] = 1; break;
                    case 1: this.bildungsbereiche[name].find(e => e['id'] === id)['erfuellt'] = 2; break;
                    case 2: this.bildungsbereiche[name].find(e => e['id'] === id)['erfuellt'] = 0; break;
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
    --clr-bb-100: rgb(255, 73, 73);
    --clr-bb-200: rgb(174, 243, 174);
    --clr-bb-300: rgb(247, 194, 96);
    --clr-bb-400: rgb(76, 76, 248);
    --clr-bb-500: rgb(253, 207, 215);
    --clr-bb-600: rgb(187, 223, 235);
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






.overview {
    font-size: 50%;
}





.eintrag {
    background: var(--clr-bb-eintrag);
    display: inline-block;
    font-weight: bold;
    padding: .25em;
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
    vertical-align: top;
}
.beschreibung {
    font-size: .7rem;
}
</style>