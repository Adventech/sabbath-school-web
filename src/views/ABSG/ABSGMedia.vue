<template>
  <p>Loading</p>
</template>

<script>
import DayJS from "dayjs"

export default {
  async mounted () {
    await this.getResources()
  },
  methods: {
    getResources: async function () {
      try {
        const feed = (await this.$apiResources.get(`en/ss/index.json`)).data
        this.adult = feed.groups.find((g) => g.title === 'Standard Adult') ?? feed.groups[0]

        const today = DayJS()

        const resource = this.adult.resources.find(r => {
          const start = DayJS(r.startDate, 'DD/MM/YYYY')
          const end = DayJS(r.endDate, 'DD/MM/YYYY')
          return today.isAfter(start.subtract(1, 'day')) && today.isBefore(end.add(1, 'day'))
        })

        const resourceData = (await this.$apiResources.get(`en/ss/${resource.name}/sections/index.json`)).data

        const foundDoc = resourceData.sections
            .map(section => section.documents.find(doc => {
              const start = DayJS(doc.startDate, 'DD/MM/YYYY')
              const end = DayJS(doc.endDate, 'DD/MM/YYYY')
              return today.isAfter(start.subtract(1, 'day')) && today.isBefore(end.add(1, 'day'))
            }))
            .find(doc => doc) || (resourceData.sections[0]?.documents[0] || null)

        if (foundDoc) {
          this.$router.push({ name: 'document', params: { resourceLanguage: 'en', resourceName: resource.name, documentName: foundDoc.name, segmentName: 'audio' }})

        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>