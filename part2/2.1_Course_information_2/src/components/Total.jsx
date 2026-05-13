const Total = ({parts}) => {

const initValue = 0
const total = parts.reduce((s, p) => s + p.exercises, initValue, );

return ( 
    <>
        <strong>total of {total} exercises</strong>
    </>
    )
}
export default Total