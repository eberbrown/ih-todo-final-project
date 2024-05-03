import { supabase } from '@/api/supabase'

export async function createAccount(email, password, firstName, lastName) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }
  })

  if (error) {
    console.log(error)
    alert(error)
    throw error
  }

  alert('Sign Up has been successful! Please verify your email before logging in. :)')
  return data
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    console.log(error)
    alert(error)
    throw error
  }

  return data
}

export async function seeCurrentUser() {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.log(error)
    return data.session
  }

  return data.session
}

export async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
    throw error
  }

  alert('Log out has been successful')
}
