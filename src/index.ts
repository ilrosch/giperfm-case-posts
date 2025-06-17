type Post = {
  id: number
  userId: number
  title: string
  body: string
}

type State = {
  limit: number
  page: number
  amount: number
}


const getPosts = async ({ page, limit }: State) => {
  const start = (page - 1) * limit + 1

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
    const posts = await res.json()
    return posts
  } catch (err) {
    alert('Error loading posts!')
    console.error(err)
  }
  
  return null
}

const createPost = (post: Post): HTMLTableRowElement => {
  const row = document.createElement('tr')
  const name = document.createElement('td')
  const text = document.createElement('td')

  name.textContent = post.title
  text.textContent = post.body

  row.append(name, text)
  return row
}

const renderPosts = async (state: State, elements): Promise<void> => {
  elements.btnLoad.disabled = true
  elements.load.classList.add('load_active')

  const posts = await getPosts(state)
  
  if (!Array.isArray(posts)) {
    elements.btnLoad.disabled = false
    elements.load.classList.remove('load_active')
  }

  const postsElements = posts.map(createPost)
  
  elements.box.append(...postsElements)

  state.amount += posts.length
  elements.amount.textContent = `${state.amount} items`

  if (posts.length) elements.btnLoad.disabled = false
  elements.load.classList.remove('load_active')
}

const app = async (): Promise<void> => {
  const elements = {
    box: document.querySelector('.table__body'),
    btnLoad: document.querySelector('[data-name="btn-load"]'),
    load: document.querySelector('[data-name="load"]'),
    amount: document.querySelector('[data-name="amount"]')
  }

  const state: State = { limit: 5, page: 1, amount: 0 }

  elements.btnLoad?.addEventListener('click', async (): Promise<void> => {
    state.page += 1
    await renderPosts(state, elements)
  })

  await renderPosts(state, elements)
}

app()
