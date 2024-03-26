import { supabase } from '@/api/supabase'

/* export async function createAccount(email, password, firstName) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName
      }
    }
  })
  if (error) {
    console.log(error)
    alert(error)
    return error
  } else {
    console.log(data)
    return data
  }
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  if (error) {
    console.log(error)
    alert(error)
    return error
  } else {
    console.log(data)
    return data
  }
} */

export async function seeCurrentUser() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.log(error)
    return data.session
  } else {
    console.log(data);
    return data.session
  }
}

/* export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  } else {
    alert('Log out has been successful')
  }
} */
