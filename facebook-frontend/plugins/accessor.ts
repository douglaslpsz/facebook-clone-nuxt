import { Plugin } from '@nuxt/types'
import { initializeAxios, initializeCookies } from '@/utils/nuxt-instance'

const accessor: Plugin = ({ $axios, $cookies }) => {
  initializeAxios($axios)
  initializeCookies($cookies)
}

export default accessor
