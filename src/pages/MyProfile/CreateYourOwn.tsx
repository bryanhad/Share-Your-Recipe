import Button from '../../components/Button'

export default function CreateYourOwn() {
  return (
    <div className='flex flex-col gap-2 items-center'>
      <p>You haven't posted a single recipe yet!</p>
      <Button type='link' href='/create' style='fill' className='py-3 px-6'>Create</Button>
    </div>
  )
}
