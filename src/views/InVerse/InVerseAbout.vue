<template>
  <div class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container flex flex-col gap-10">
      <div class="flex flex-col gap-3">
        <p class="text-center sm:text-left text-sspm-accent-1000">About us</p>
        <p class="text-center sm:text-left lg:max-w-[64%] xl:max-w-[44%] leading-tight text-3xl font-bold">A Bible Study Movement for the Thinking Believer</p>
        <div class="flex flex-col gap-6">
          <p class="text-center sm:text-left text-black/60">inVerse is a Bible study guide for university students, young adults, working professions, and young parents (ages 18–35+). Published by the Seventh-day Adventist Church®, two of the four quarters correlate with the same study topics as the Adult Bible Study Guide, while the two remaining topics specifically address young adult issues.</p>
          <p class="text-center sm:text-left text-black/60">The young adult Sabbath School guide began in 1978 when a Union College student in Nebraska‚ United States realized that there was a Seventh-day Adventist Bible study guide for every age level except his. That realization began a series of events that led to the development of CQ (Collegiate Quarterly)‚ which was initially published in the first quarter of 1979.</p>
          <p class="text-center sm:text-left text-black/60">For several years‚ college students and professors from twelve Adventist colleges and universities in North America shared the responsibilities of putting the Bible study guide together. In 1982‚ CQ went international when it invited students and faculty at Hong Kong Adventist College to participate.</p>
          <p class="text-center sm:text-left text-black/60">Forty years later in 2019, the young adult Bible study guide progressed to an updated format that utilized online and print formats together. Pulling from similar motifs of CQ, the content sought to appeal to both university students and young adults. The name was updated to inVerse to highlight the engagement of Bible study and the emphasis of different perspectives.</p>
          <p class="text-center sm:text-left text-black/60">The desire of the Sabbath School and Personal Ministries department is the same as it was in January of 1979—that through Bible study, many may come to love and serve the Lord Jesus Christ, who “first loved us.” (1 John 4:19, KJV).</p>
        </div>
      </div>

      <div class="bg-gray-100 rounded-xl flex flex-col gap-10 p-10">
        <div class="mx-auto">
          <p class="text-2xl font-bold text-center">Editorial Team</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-20">
          <div class="flex flex-col gap-2 text-center sm:text-left">
            <img class="mx-auto sm:mx-0 aspect-[1/1] max-w-44 object-cover rounded-lg shadow-lg" src="/assets/img/sspm-inverse-joe.png" alt="Photo of Joe Reeves, Assistant Director and Editor" />
            <p class="font-bold text-lg">Joe Reeves</p>
            <p class="text-sspm-accent-1000">Assistant Director and Editor</p>
            <p class="text-black/60">Joe entered the ministry with a special focus on teaching, evangelism, and church planting. As a pastor, he gained a decade of experience in frontline youth and young adult ministry. Currently, he oversees the production of the inVerse Young Adult Bible Study Guide and serves as host of the inVerse program on Hope Channel. His favorite hobbies include music and outdoor adventure.</p>
          </div>

          <div class="flex flex-col gap-2 text-center sm:text-left">
            <img class="mx-auto sm:mx-0 aspect-[1/1] max-w-44 object-cover rounded-lg shadow-lg" src="/assets/img/sspm-inverse-paige.png" alt="Photo of Paige Swanson, Senior Editorial Assistant" />
            <p class="font-bold text-lg">Paige Swanson</p>
            <p class="text-sspm-accent-1000">Senior Editorial Assistant</p>
            <p class="text-black/60">Paige utilizes her education and passion for writing to help convey Bible truth in a clear and concise way that appeals to young adults. With her creativity and attention to detail, she helps to oversee the many video, audio, and print resources that contribute to the inVerse Bible study experience. Paige is an animal lover who enjoys hands-on projects like sewing, crocheting, and drawing.</p>
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
    title.value = `About - InVerse Bible Study Guides`
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';

</style>