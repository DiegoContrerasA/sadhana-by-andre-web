"use client"

import { useForm } from "react-hook-form"

import { TextField } from "@/components/form/text-field"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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

import { ShowcaseSection } from "./showcase-section"

type EmailValues = { email: string }

function EditEmailDialog() {
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

function SignOutAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Modal de confirmación
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
          <AlertDialogDescription>
            Tendrás que iniciar sesión de nuevo para ver tus clases.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Cerrar sesión</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function ModalsShowcase() {
  return (
    <ShowcaseSection
      title="Modales"
      description="Dialog con formulario y AlertDialog de confirmación. Se cierran con Esc, el botón o fuera del modal."
    >
      <div className="flex flex-wrap items-center gap-3">
        <EditEmailDialog />
        <SignOutAlertDialog />
      </div>
    </ShowcaseSection>
  )
}
