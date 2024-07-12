import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react"
import { Button } from "../../../components/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { format } from "date-fns"
import "react-day-picker/dist/style.css"
import { ptBR } from "date-fns/locale"

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  eventDates: DateRange | undefined
  setIsGuestsInputOpen: (value: boolean) => void
  setDestination: (destination: string) => void
  setEventDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  setIsGuestsInputOpen,
  setDestination,
  setEventDates,
  eventDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const displayedDate =
    eventDates && eventDates.from && eventDates.to
      ? format(eventDates.from, "d' de 'LLL", { locale: ptBR })
          .concat(" até ")
          .concat(format(eventDates.to, "d' de 'LLL", { locale: ptBR }))
      : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <button
        onClick={() => setIsDatePickerOpen(true)}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left w-[240px]"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="bg-transparent text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Selecione a data</h2>
              <button onClick={() => setIsDatePickerOpen(false)}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>

            <DayPicker
              mode="range"
              selected={eventDates}
              onSelect={setEventDates}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button variant="secondary" onClick={() => setIsGuestsInputOpen(false)}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button variant="primary" onClick={() => setIsGuestsInputOpen(true)}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}
