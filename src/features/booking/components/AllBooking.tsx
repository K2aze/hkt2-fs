"use client";

import { useEffect, useState } from "react";
import { http } from "@/lib/http"; // Điều chỉnh path theo project của bạn
import { InferSelectModel } from "drizzle-orm";
import { bookingsTable } from "@/server/db/schema";
import {
  Clock3,
  BadgeCheck,
  XCircle,
  Check,
  User,
  Mail,
  Calendar,
  Clock,
  Users,
  Phone,
  Scissors,
} from "lucide-react";

type BookingInfer = InferSelectModel<typeof bookingsTable>;

interface BookingsResponse {
  message: BookingInfer[];
}

export default function AllBooking() {
  const [bookings, setBookings] = useState<BookingInfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await http.get("bookings");
        const data = await response.data;
        console.log(data.message);
        setBookings(data.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString);
  };

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" aria-live="assertive">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (bookings.length == 0) {
    return (
      <div role="status">
        <p>There are no bookings.</p>
      </div>
    );
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            <Clock3 size={14} /> Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            <BadgeCheck size={14} /> Confirmed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
            <XCircle size={14} /> Cancelled
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            <Check size={14} /> Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
            Unknown
          </span>
        );
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Bookings</h1>
        <p className="text-gray-600 text-sm">
          Total: <span className="font-semibold">{bookings.length}</span>{" "}
          bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-lg">No bookings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <User size={18} className="text-blue-600" />
                      {item.full_name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                      <Mail size={14} /> {item.email}
                    </p>
                  </div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span>
                      Date:{" "}
                      {new Date(item.booking_date).toLocaleDateString("en-GB")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <span>
                      Time:{" "}
                      {item.time.charAt(0).toUpperCase() + item.time.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span>Participants: {item.people}</span>
                  </div>

                  {item.phone_number && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <span>Phone: {item.phone_number}</span>
                    </div>
                  )}

                  {item.services && item.services.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Scissors size={16} className="text-gray-500 mt-0.5" />
                      <div>
                        <span>Services:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.services.map((id) => (
                            <span
                              key={id}
                              className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded"
                            >
                              Service {id}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer (có thể thêm button xem chi tiết, edit, cancel, v.v.) */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-right">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
