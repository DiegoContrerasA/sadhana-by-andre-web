"use client"

import { useForm } from "react-hook-form"

import { TextField } from "@/components/form/text-field"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type EmailValues = { email: string }

export function EditEmailDialog() {
  const { control } = useForm<EmailValues>({ defaultValues: { email: "" } })

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Modal con formulario
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar correo</DialogTitle>
          <DialogDescription>
            Te enviaremos un enlace para confirmar el nuevo correo.
          </DialogDescription>
        </DialogHeader>
        <TextField
          control={control}
          name="email"
          label="Correo nuevo"
          placeholder="tu@correo.com"
          type="email"
          autoComplete="off"
        />
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
