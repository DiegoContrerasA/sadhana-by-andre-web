"use client"

import { MailIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { CheckboxField } from "@/components/form/checkbox-field"
import { PasswordField } from "@/components/form/password-field"
import { TextField } from "@/components/form/text-field"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

import { ShowcaseSection } from "./showcase-section"

type ShowcaseValues = {
  email: string
  password: string
  remember: boolean
  invalidEmail: string
  invalidPassword: string
  invalidTerms: boolean
}

export function FieldsShowcase() {
  const { control } = useForm<ShowcaseValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
      invalidEmail: "correo-incorrecto",
      invalidPassword: "",
      invalidTerms: false,
    },
    errors: {
      invalidEmail: { type: "custom", message: "Ingresa un correo válido" },
      invalidPassword: { type: "custom", message: "Ingresa tu contraseña" },
      invalidTerms: {
        type: "custom",
        message: "Debes aceptar los términos para continuar",
      },
    },
  })

  return (
    <ShowcaseSection
      title="Campos"
      description="Campos de 48px con ícono, contraseña, checkbox, errores y deshabilitado."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <TextField
            control={control}
            name="email"
            label="Correo con ícono"
            icon={MailIcon}
            placeholder="tu@correo.com"
            type="email"
            autoComplete="off"
          />
          <PasswordField
            control={control}
            name="password"
            label="Contraseña"
            autoComplete="new-password"
            placeholder="Tu contraseña"
            description="Mínimo 8 caracteres, con letras y números"
          />
          <CheckboxField control={control} name="remember" label="Recordarme" />
        </div>
        <div className="flex flex-col gap-4">
          <TextField
            control={control}
            name="invalidEmail"
            label="Correo con error"
            icon={MailIcon}
          />
          <PasswordField
            control={control}
            name="invalidPassword"
            label="Contraseña con error"
            autoComplete="current-password"
          />
          <CheckboxField
            control={control}
            name="invalidTerms"
            label="Acepto los términos"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Input className="max-w-xs" placeholder="Input base" />
        <Input className="max-w-xs" placeholder="Deshabilitado" disabled />
        <Checkbox aria-label="Checkbox marcado" defaultChecked />
        <Checkbox aria-label="Checkbox deshabilitado" disabled />
      </div>
    </ShowcaseSection>
  )
}
