"use client"
import { FormEvent, useState } from "react"
import { AddCustomerDocument } from "../../../../__gql__/graphql"
import { useMutation } from "@apollo/client"
function CustomerInput() {

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [phone_number, setPhone_number] = useState("")

    const [addMutation] = useMutation(AddCustomerDocument)

    const addCustomerToDB = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const variables = {
            customer: {
                phone_number: phone_number,
                first_name: first_name,
                last_name: last_name
            }
        }

        addMutation({
            variables: {
                customer: {
                    whatsapp_name: "",
                    phone_number: phone_number,
                    first_name: first_name,
                    last_name: last_name
                }
            }
        })
        
        setFirst_name('')
        setLast_name('')
        setPhone_number("")
    }

    return (
        <div className="p-2 ">
            <h1 className="text-2xl py-2 font-sans">Add customer details</h1>
            <form onSubmit={addCustomerToDB} className="max-w-3xl font-sans font-bold">
                <label htmlFor="first_name">first_name</label>
                <input onChange={e => setFirst_name(e.target.value)} type="text" placeholder='Access Token' name='first_name' id="first_name" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
                <label htmlFor="last_name">last_name</label>
                <input onChange={e => setLast_name(e.target.value)} type="text" placeholder='App ID' name='last_name' id="last_name" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
                <label htmlFor="phone_number">phone_number</label>
                <input onChange={e => setPhone_number(e.target.value)} type="text" placeholder='App Secret' name='phone_number' id="phone_number" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
                <input type="submit" value="Add Customer" name='' className="'bg-slate-300 dark:bg-gray-500 rounded-lg px-4 py-2 outline-none cursor-pointer" />
            </form>
        </div>
    )
}

export default CustomerInput