'use client'
import { useState } from "react";
import CustomerInput from "./CustomerInput";
import CustomerSearch from "./CustomerSearch";

type Props = {}

function SidePanelNav({ }: Props) {
    const [showAddForm, setShowAddForm] = useState(false)
    return (
        <div>
            {showAddForm
                ? <div>
                    <CustomerInput />
                    <button onClick={e => setShowAddForm(!showAddForm)}>or search</button>
                </div>
                : <div>
                    <CustomerSearch />
                    <button onClick={e => setShowAddForm(!showAddForm)}>or add a customer</button>
                </div>
            }
        </div>
    )
}

export default SidePanelNav