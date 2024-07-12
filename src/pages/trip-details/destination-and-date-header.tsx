import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DateRange, DayPicker } from "react-day-picker"

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  const [destination, setDestination] = useState("")
  const [eventDates, setEventDates] = useState<DateRange | undefined>()

  const [isDestinationInputOpen, setIsDestinationInputOpen] = useState(false)

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  async function updateTrip() {
    if (!destination) {
      return
    }

    if (!eventDates?.from || !eventDates?.to) {
      return
    }

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventDates.from,
      ends_at: eventDates.to,
    })

    window.document.location.reload()
  }

  const displayedDateApi = trip
    ? format(trip.starts_at, "d' de 'LLL", { locale: ptBR })
        .concat(" até ")
        .concat(format(trip.ends_at, "d' de 'LLL", { locale: ptBR }))
    : null

  const displayedDateUpdate =
    eventDates && eventDates.from && eventDates.to
      ? format(eventDates.from, "d' de 'LLL", { locale: ptBR })
          .concat(" até ")
          .concat(format(eventDates.to, "d' de 'LLL", { locale: ptBR }))
      : null

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        {isDestinationInputOpen ? (
          <input
            type="text"
            placeholder="Para onde você vai?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            onChange={(e) => setDestination(e.target.value)}
          />
        ) : (
          <span className="text-zinc-100">{trip?.destination}</span>
        )}
      </div>

      <div className="flex items-center gap-5">
        {isDestinationInputOpen ? (
          <button
            onClick={() => setIsDatePickerOpen(true)}
            className="flex items-center gap-2 text-left w-[240px]"
          >
            <Calendar className="size-5 text-zinc-400" />
            <span className="bg-transparent text-lg text-zinc-400 w-40 flex-1">
              {displayedDateUpdate || "Quando?"}
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">{displayedDateApi}</span>
          </div>
        )}

        <div className="w-px h-6 bg-zinc-800" />

        {isDestinationInputOpen ? (
          <Button onClick={updateTrip} variant="primary">
            Atualizar viagem
            <ArrowRight className="size-5" />
          </Button>
        ) : (
          <Button
            onClick={() => setIsDestinationInputOpen(true)}
            variant="secondary"
          >
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        )}
      </div>

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
    </div>
  )
}
