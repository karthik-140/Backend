import AddUsers from '../components/AddUsers'
import DrawerList from '../components/DrawerList'

const Landing = (props) => {

  return (
    <>
      <div className='flex'>
        <DrawerList />
        <AddUsers />
      </div>
    </>
  )
}

export default Landing
