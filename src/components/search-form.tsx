'use client'

import { searchSchema } from "@/validators/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"

export default function SearchForm() {
  const router = useRouter()

  async function handleSearch(values: z.infer<typeof searchSchema>) {
    router.push(`/?search=${values.search}`)
  }

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)} className="w-full">
        <FormField
          name="search"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full">
                <Input {...field} className="p-5" placeholder="Postcode, Town, City or Country" />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
