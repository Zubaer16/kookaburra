'use client'

import { useUser } from '@clerk/nextjs'

function Header() {
  const { user } = useUser()
  return <div>Header</div>
}

export default Header
