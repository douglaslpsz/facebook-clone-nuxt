import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Mobile from '@/store/mobile'
import UserRegister from '@/store/users/register'
import Auth from '@/store/auth'

// eslint-disable-next-line import/no-mutable-exports
let mobile: Mobile
let userRegister: UserRegister
let auth: Auth

const initializeStores = (store: Store<any>): void => {
  mobile = getModule(Mobile, store)
  userRegister = getModule(UserRegister, store)
  auth = getModule(Auth, store)
}

export { initializeStores, mobile, userRegister, auth }
