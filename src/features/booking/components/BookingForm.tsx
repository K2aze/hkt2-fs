"use client";
import { http } from "@/lib/http";
import { useRouter } from "@/lib/i18n/navigation";
import { bookingDateString } from "@/lib/validations";
// import { useAuth } from "@/providers/AuthContext";
import { useForm } from "@tanstack/react-form-nextjs";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Scissors,
  Clock,
  MessageSquare,
  Check,
} from "lucide-react";
import z from "zod";

export const bookingSchemaForm = z.object({
  fullName: z.string().min(1),
  email: z.email(),
  phoneNumber: z
    .string()
    .min(8, "PHONE_REQUIRED")
    .regex(/^\d+$/, "PHONE_INVALID"),
  bookingDate: bookingDateString,
  people: z.number().int().min(1).max(10),
  services: z.array(z.number()).nullable(),
  time: z.string(),
  subscription: z.boolean(),
  request: z.string(),
});

const BookingForm = () => {
  const route = useRouter();
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      bookingDate: "",
      people: 1,
      services: null, // hoặc [] nếu bạn muốn mảng rỗng thay vì null
      time: "morning",
      subscription: false,
      requests: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form data", value);
      console.log("Submited");
      try {
        await http.post("bookings", value);
        route.replace("/bookings");
      } catch (error: unknown) {
        console.log(error);
      }
    },
  });
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Book Your Appointment
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Full Name */}
        <form.Field
          name="fullName"
          validators={{ onChange: bookingSchemaForm.shape.fullName }}
        >
          {(field) => (
            <div className="space-y-1">
              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <User size={18} /> Full Name
              </label>
              <input
                type="text"
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your full name"
              />
              {field.state.meta.errors?.length > 0 && (
                <span className="text-red-600 text-sm mt-1 block">
                  {field.state.meta.errors.map((err, idx) => (
                    <em key={idx}>
                      {err?.message ||
                        (typeof err === "string" ? err : "Unknown error")}
                    </em>
                  ))}
                </span>
              )}
            </div>
          )}
        </form.Field>

        {/* Email */}
        <form.Field
          name="email"
          validators={{ onChange: bookingSchemaForm.shape.email }}
        >
          {(field) => (
            <div className="space-y-1">
              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Mail size={18} /> Email
              </label>
              <input
                type="email"
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="your.email@example.com"
              />
              {field.state.meta.errors?.length > 0 && (
                <span className="text-red-600 text-sm mt-1 block">
                  {field.state.meta.errors.map((err, idx) => (
                    <em key={idx}>
                      {err?.message ||
                        (typeof err === "string" ? err : "Unknown error")}
                    </em>
                  ))}
                </span>
              )}
            </div>
          )}
        </form.Field>

        {/* Phone Number */}
        <form.Field
          name="phoneNumber"
          validators={{ onChange: bookingSchemaForm.shape.phoneNumber }}
        >
          {(field) => (
            <div className="space-y-1">
              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Phone size={18} /> Phone Number
              </label>
              <input
                type="tel"
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="+84 123 456 789"
              />
              {field.state.meta.errors?.length > 0 && (
                <span className="text-red-600 text-sm mt-1 block">
                  {field.state.meta.errors.map((err, idx) => (
                    <em key={idx}>
                      {err?.message ||
                        (typeof err === "string" ? err : "Unknown error")}
                    </em>
                  ))}
                </span>
              )}
            </div>
          )}
        </form.Field>

        {/* Booking Date */}
        <form.Field
          name="bookingDate"
          validators={{ onChange: bookingSchemaForm.shape.bookingDate }}
        >
          {(field) => (
            <div className="space-y-1">
              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Calendar size={18} /> Date
              </label>
              <input
                type="date"
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {field.state.meta.errors?.length > 0 && (
                <span className="text-red-600 text-sm mt-1 block">
                  {field.state.meta.errors.map((err, idx) => (
                    <em key={idx}>
                      {err?.message ||
                        (typeof err === "string" ? err : "Unknown error")}
                    </em>
                  ))}
                </span>
              )}
            </div>
          )}
        </form.Field>

        {/* Participants */}
        <form.Field
          name="people"
          validators={{ onChange: bookingSchemaForm.shape.people }}
        >
          {(field) => (
            <div className="space-y-1">
              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Users size={18} /> Participants
              </label>
              <input
                type="number"
                id={field.name}
                value={field.state.value ?? ""}
                onChange={(e) =>
                  field.handleChange(e.target.valueAsNumber || 1)
                }
                min={1}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Number of people"
              />
              {field.state.meta.errors?.length > 0 && (
                <span className="text-red-600 text-sm mt-1 block">
                  {field.state.meta.errors.map((err, idx) => (
                    <em key={idx}>
                      {err?.message ||
                        (typeof err === "string" ? err : "Unknown error")}
                    </em>
                  ))}
                </span>
              )}
            </div>
          )}
        </form.Field>

        {/* Services - Multi checkbox */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Scissors size={18} /> Services
          </label>

          <form.Field
            name="services"
            validators={{ onChange: bookingSchemaForm.shape.services }}
          >
            {(field) => {
              const currentValues = field.state.value ?? [];

              const toggleService = (serviceId: number) => {
                if (currentValues.includes(serviceId)) {
                  field.handleChange(
                    currentValues.filter((id) => id !== serviceId),
                  );
                } else {
                  field.handleChange([...currentValues, serviceId]);
                }
              };

              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <div key={id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`service-${id}`}
                        checked={currentValues.includes(id)}
                        onChange={() => toggleService(id)}
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`service-${id}`}
                        className="text-sm text-gray-700"
                      >
                        Service {id}
                      </label>
                    </div>
                  ))}
                </div>
              );
            }}
          </form.Field>

          <form.Field name="services">
            {(field) => (
              <>
                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, i) => (
                      <em key={i}>
                        {err?.message || "Please select at least one service"}
                      </em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        {/* Time Slot - Select */}
        <form.Field
          name="time"
          validators={{ onChange: bookingSchemaForm.shape.time }}
        >
          {(field) => (
            <div className="space-y-1">
              <label
                htmlFor="time"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Clock size={18} /> Preferred Time
              </label>
              <select
                id="time"
                value={field.state.value ?? "morning"}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
              {field.state.meta.errors?.length > 0 && (
                <span className="text-red-600 text-sm mt-1 block">
                  {field.state.meta.errors.map((err, i) => (
                    <em key={i}>
                      {err?.message || "Please select a time slot"}
                    </em>
                  ))}
                </span>
              )}
            </div>
          )}
        </form.Field>

        {/* Subscription Checkbox */}
        <form.Field
          name="subscription"
          validators={{ onChange: bookingSchemaForm.shape.subscription }}
        >
          {(field) => (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="subscription"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="subscription" className="text-sm text-gray-700">
                Subscribe to receive updates and promotions
              </label>
            </div>
          )}
        </form.Field>

        {/* Requests - Textarea */}
        <form.Field
          name="requests"
          validators={{ onChange: bookingSchemaForm.shape.request }}
        >
          {(field) => (
            <div className="space-y-1">
              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <MessageSquare size={18} /> Special Requests
              </label>
              <textarea
                id={field.name}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
                placeholder="Any special requests or notes..."
              />
              {field.state.meta.errors?.length > 0 && (
                <span className="text-red-600 text-sm mt-1 block">
                  {field.state.meta.errors.map((err, idx) => (
                    <em key={idx}>
                      {err?.message ||
                        (typeof err === "string" ? err : "Unknown error")}
                    </em>
                  ))}
                </span>
              )}
            </div>
          )}
        </form.Field>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Clock className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Check size={20} />
                  Book Now
                </>
              )}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default BookingForm;
