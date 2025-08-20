"use client";
import {useRouter} from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button onClick={router.back} className={`px-8 py-1 rounded border duration-200  hover:bg-gray-200`}>
            &lt;
        </button>
    );
}