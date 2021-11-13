import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios, $cookies } from '@/utils/nuxt-instance'
import { User } from '@/Models'

@Module({ name: 'users', stateFactory: true, namespaced: true })
export default class Users extends VuexModule {
  private user = {} as User

  get $single() {
    return this.user
  }

  @Mutation
  UPDATE_USER(user: User) {
    this.user = user
  }

  @Action({ rawError: true })
  public async show() {
    if (!$cookies.get('token')) return

    const user = await $axios.$get('/users')
    this.context.commit('UPDATE_USER', user)
  }
}
