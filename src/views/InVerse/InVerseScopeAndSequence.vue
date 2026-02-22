<template>
  <div class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container flex flex-col gap-10">
      <div class="flex flex-col gap-3">
        <p class="text-center sm:text-left lg:max-w-[64%] xl:max-w-[44%] leading-tight text-3xl font-bold text-sspm-accent-800">Scope and Sequence</p>
        <p class="text-center sm:text-left text-black/70">InVerse is studying the core themes of the Bible and relevant topics for today. We hope that the upcoming topics will
          strengthen people’s faith and help them be better grounded in the Word.</p>
        <p class="text-center sm:text-left text-black/70">Please remember that the information regarding future topics is not final and is subject to change. Also, please note that
          the following information reflects only the topic that will be studied for each quarter and not the title of the Bible study
          guide itself.</p>
      </div>

      <div class="shadow-2xl overflow-x-auto  w-full rounded-xl">
        <table class="w-full absg-scope-sequence">
          <thead>
            <td>Year</td>
            <td>Quarter 1</td>
            <td>Quarter 2</td>
            <td>Quarter 3</td>
            <td>Quarter 4</td>
          </thead>
          <tbody>
            <tr>
              <td>2026</td>
              <td>Apologetics: Mars Hill</td>
              <td>How to Be in a Relationship with God</td>
              <td>Closing Scenes of Christ’s Life</td>
              <td>Gift of Prophecy</td>
            </tr>

            <tr>
              <td>2027</td>
              <td>Jesus in Apocalyptic</td>
              <td>Prophecy</td>
              <td>The Life of Joseph</td>
              <td>Stewardship God’s Church My Church</td>
            </tr>

            <tr>
              <td>2028</td>
              <td>Embracing the Mission</td>
              <td>Love and Relationships</td>
              <td>Acts</td>
              <td>Proverbs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useTitle } from "@vueuse/core"

export default {
  mounted () {
    const title = useTitle()
    title.value = `Scope and Sequence - Adult Bible Study Guides`
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';
.absg-scope-sequence {
  @apply min-w-full table-auto;
  thead {
    @apply bg-sspm-accent-1000 text-white;
    td {
      @apply p-6;
      &:first-child {
        @apply rounded-tl-xl;
      }
      &:last-child {
        @apply rounded-tr-xl;
      }
    }
  }
  tbody {
    tr {
      td {
        @apply p-6 text-gray-500;
      }
      &:nth-child(odd) {
        @apply bg-gray-100;
      }
      &:last-child {
        td {
          &:first-child {
            @apply rounded-bl-xl;
          }
          &:last-child {
            @apply rounded-br-xl;
          }
        }
      }
    }
  }
}
</style>