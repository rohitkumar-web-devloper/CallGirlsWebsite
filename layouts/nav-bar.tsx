'use client'
import React from 'react'
import { Container } from './Container'
import { Button } from '@/components/ui/button'
import { Plus, User, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { userInfoStore } from '@/stores'
import Logo from '../assets/logo3.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {

  LogOut,

} from "lucide-react"
import Image from 'next/image'
const NavBarComp = () => {
  const router = useRouter()
  const { user,addUserInfo } = userInfoStore()
  return (
    <header className='top-0 left-0 z-50 sticky py-4 w-full nav-bg'>
      <Container className=''>
        <div className='flex justify-between items-center'>
          {/* <h1>Logo</h1> */}
          <Image src={Logo} width={160} height={70} alt='logo'className='cursor-pointer'  onClick={() => router.push('/')}/>
          <div className='flex gap-3'>
            {/* <Button className='rounded-full' variant="outline" size="icon" >
                            <Search />
                        </Button> */}
            {!user && (
              <Button
                className='rounded-full'
                variant='secondary'
                size='icon'
                onClick={() => router.push('sign-in')}
              >
                <User />
              </Button>
            )}
            {user && (
              <div className='flex items-center gap-4'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage src={user?.profile} alt='@shadcn' />
                      <AvatarFallback>{user?.firstName}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                        <User />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        localStorage.clear()
                        addUserInfo('')
                        router.push('/')
                      }}>
                        <LogOut />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
                <h1 className='text-md text-white  hidden sm:block'>Hi, {user?.firstName}</h1>
              </div>
            )}
            <Button
              className='rounded-full font-medium text-black'
              onClick={() => {
                if (user) {
                  router.push('post-ads')
                } else {
                  router.push('sign-in')
                }
              }}
            >
              <Plus />
              Add Post
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}

export { NavBarComp }
