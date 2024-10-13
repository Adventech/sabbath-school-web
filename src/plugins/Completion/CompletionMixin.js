export default {
    data() {
        return {
            contextData: {},
        };
    },

    async mounted () {
        this.emitter.on(`completion-filled-${this.block.id}`, (data) => {
            const completion = {
                [data.completionId]: data.userCompletion
            }
            if (!this.contextData.completion) {
                this.contextData.completion = completion
            } else {
                this.contextData.completion[data.completionId] = data.userCompletion
            }

            this.$emit('completion', completion)
        })
    },
};