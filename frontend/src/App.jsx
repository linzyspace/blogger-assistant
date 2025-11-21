import { useState } from 'react'


export default function App(){
const [topic, setTopic] = useState('')
const [result, setResult] = useState(null)
const generate = async ()=>{
const res = await fetch('/api/generate', {
method: 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify({topic})
})
const data = await res.json()
setResult(data.result)
}
return (
<div className="p-6 font-sans">
<h1 className="text-2xl mb-4">Blog Assistant</h1>
<input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic" className="border p-2" />
<button onClick={generate} className="ml-2 p-2 border rounded">Generate</button>
<pre className="mt-4 bg-gray-100 p-4">{JSON.stringify(result, null, 2)}</pre>
</div>
)
}
