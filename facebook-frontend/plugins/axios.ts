import { Plugin } from '@nuxt/types'

const axiosPlugin: Plugin = ({ app, store, redirect }) => {
  app.$axios.onRequest((config) => {
    const token = app.$cookies.get('token')

    if (token) {
      config.headers.Authorization = `bearer ${token}`
    }
  })
  app.$axios.onError((error) => {
    // Caso a api retorne status 401, o token expirou ou é inválido
    if (error.response?.status === 401) {
      // Remove o token dos cookies
      app.$cookies.remove('token')

      // Remove o token da store
      store.dispatch('auth/update', { token: null })

      // Manda o usuário para a tela de login
      return redirect('/login')
    }
  })
}

export default axiosPlugin
