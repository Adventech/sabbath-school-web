export default {
    data() {
        return {
            highlights: []
        };
    },
    computed: {
        userInputHighlights: function () {
            return this.userInput.find(i => i.inputType === "highlights")
        }
    },
    watch: {
        userInput: async function (newValue, oldValue) {
            if (this.userInputHighlights) {
                this.highlights = await this.$highlighter.applyHighlights(this.$el, this.userInputHighlights.highlights)
            }
        }
    },
    async mounted () {
        this.emitter.on('highlight', async (color) => {
            let highlight = await this.$highlighter.getHighlightForElement(this.$el, { color })
            if (highlight) {
                this.highlights = await this.$highlighter.applyHighlights(this.$el, this.highlights, highlight)
                this.saveHighlights()
            }
        });
    },
    methods: {
        saveHighlights: function () {
            this.$emit('highlight', this.highlights)
        },
    }
};