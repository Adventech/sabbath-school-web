<template>
  <div class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container flex flex-col gap-10">
      <div class="flex flex-col gap-3">
        <p class="text-center sm:text-left text-sspm-accent-600">About us</p>
        <p class="text-center sm:text-left lg:max-w-[64%] xl:max-w-[44%] leading-tight text-3xl font-bold">Deepening Faith Through the Study of God’s Word</p>
        <p class="text-center sm:text-left text-black/70">The Adult Bible Study Guide (ABSG) is the official Sabbath School Bible study resource for adults in the Seventh-day Adventist Church. Designed to nurture spiritual growth and biblical understanding, ABSG offers in-depth, theologically sound lessons that connect Scripture to everyday life.</p>
      </div>

      <div class="bg-gray-100 rounded-xl flex flex-col gap-10 p-10">
        <div class="mx-auto">
          <p class="text-2xl font-bodld text-center">Editorial Team</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-20">
          <div class="flex flex-col gap-2 text-center sm:text-left">
            <img class="mx-auto sm:mx-0 aspect-[1/1] max-w-44 object-cover rounded-lg shadow-lg" src="/assets/img/sspm-absg-clifford-goldstein.png" />
            <p class="font-bold text-lg">Clifford Goldstein</p>
            <p class="text-sspm-accent-600">Editor</p>
            <p class="text-black/60">Clifford Goldstein has been editor of the Adult Sabbath School Bible Study Guide since 1999. From 1992–1997, he was editor of Liberty; and from 1984–1992, editor of Shabbat Shalom. He has an M.A. in Ancient Northwest Semitic Languages from Johns Hopkins University (1992). He has authored about 21 books, his latest are God, Godel, and Grace (Review and Herald) and Graffiti in the Holy of Holies (Pacific Press).</p>
          </div>

          <div class="flex flex-col gap-2 text-center sm:text-left">
            <img class="mx-auto sm:mx-0 aspect-[1/1] max-w-44 object-cover rounded-lg shadow-lg" src="/assets/img/sspm-absg-soraya.png" />
            <p class="font-bold text-lg">Soraya L. Homayouni</p>
            <p class="text-sspm-accent-600">Associate Editor</p>
            <p class="text-black/60">Soraya L. Homayouni is the editor of the Easy Reading Adult Sabbath School Bible Study Guide and its abridgment and the associate editor of the Standard and Teachers Editions of the Adult Sabbath School Bible Study Guides. She is graduate from the Master of Fine Arts Program for Writers from Warren Wilson College.</p>
          </div>

          <div class="flex flex-col gap-2 text-center sm:text-left">
            <img class="mx-auto sm:mx-0 aspect-[1/1] max-w-44 object-cover rounded-lg shadow-lg" src="/assets/img/sspm-absg-lea.png" />
            <p class="font-bold text-lg">Lea A. Greve</p>
            <p class="text-sspm-accent-600">Publications Manager</p>
            <p class="text-black/60">Lea A. Greve is the publications manager for the Adult Sabbath School Bible Study Guide. She oversees production for each of the four editions: Standard, Teachers, Easy Reading, and the Abridgment.</p>
          </div>

          <div class="flex flex-col gap-2 text-center sm:text-left">
            <img class="mx-auto sm:mx-0 aspect-[1/1] max-w-44 object-cover rounded-lg shadow-lg" src="/assets/img/sspm-absg-sharon.png" />
            <p class="font-bold text-lg">Sharon J. Crews</p>
            <p class="text-sspm-accent-600">Editorial Assistant</p>
            <p class="text-black/60">Sharon Crews is the editorial assistant of the Office of the Adult Bible Study Guide. She joined the ABSG editiorial team in June 2007.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTitle } from "@vueuse/core"

export default {
  mounted () {
    const title = useTitle()
    title.value = `About - Adult Bible Study Guides`
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';

</style>