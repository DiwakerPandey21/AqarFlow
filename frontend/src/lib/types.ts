export type UserRole = "agency_admin" | "agent" | "manager";

export interface User {
  id: string;
  agency_id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  status: "active" | "inactive";
  created_at: string;
}

export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  phone?: string;
  email?: string;
  address?: string;
  city: string;
  default_currency: string;
  timezone: string;
  status: "active" | "inactive";
}

export type PropertyPurpose = "sale" | "rent" | "lease";
export type PropertyCategory = "residential" | "commercial" | "plot";
export type PropertyType =
  | "House"
  | "Apartment"
  | "Villa"
  | "Penthouse"
  | "Residential Plot"
  | "Commercial Plot"
  | "Office"
  | "Shop";
export type PropertyStatus =
  | "Draft"
  | "Available"
  | "Reserved"
  | "Under Offer"
  | "Sold"
  | "Rented"
  | "Inactive";

export interface Property {
  id: string;
  agency_id: string;
  reference_code: string;
  title: string;
  slug: string;
  purpose: PropertyPurpose;
  category: PropertyCategory;
  property_type: PropertyType;
  price: number;
  currency: string;
  area_value: number;
  area_unit: "Marla" | "Kanal" | "Sq. Ft" | "Sq. Yd";
  bedrooms?: number;
  bathrooms?: number;
  address?: string;
  city: string;
  locality: string;
  latitude?: number;
  longitude?: number;
  amenities: string[];
  furnishing: "Unfurnished" | "Semi-Furnished" | "Furnished";
  construction_status: "Ready" | "Under Construction" | "Newly Built";
  possession_status: "Immediate" | "Available" | "Under Lease";
  description?: string;
  cover_image?: string;
  gallery_images: string[];
  status: PropertyStatus;
  is_featured: boolean;
  is_published: boolean;
  assigned_agent_id?: string;
  owner_name?: string;
  owner_phone?: string;
  created_at: string;
  updated_at: string;
  assigned_agent?: User;
}

export type LeadStage =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Visit Scheduled"
  | "Negotiation"
  | "Converted"
  | "Lost";

export interface Activity {
  id: string;
  agency_id: string;
  lead_id: string;
  user_id?: string;
  activity_type: "call" | "whatsapp" | "meeting" | "note" | "stage_change";
  body: string;
  occurred_at: string;
}

export interface Lead {
  id: string;
  agency_id: string;
  property_id?: string;
  client_name: string;
  phone: string;
  email?: string;
  preferred_contact_method: "WhatsApp" | "Phone" | "Email";
  purpose: "Buy" | "Rent" | "Invest";
  budget_min?: number;
  budget_max?: number;
  preferred_location?: string;
  property_type?: string;
  source: "Website" | "WhatsApp" | "Walk-in" | "Referral" | "Portal";
  stage: LeadStage;
  assigned_agent_id?: string;
  notes?: string;
  next_follow_up_at?: string;
  created_at: string;
  updated_at: string;
  property?: Property;
  assigned_agent?: User;
  activities: Activity[];
}

export type VisitStatus =
  | "Requested"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "No-show";

export interface Visit {
  id: string;
  agency_id: string;
  property_id: string;
  lead_id?: string;
  client_name: string;
  client_phone: string;
  agent_id: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_point?: string;
  visitor_count: number;
  status: VisitStatus;
  notes?: string;
  outcome?: string;
  created_at: string;
  property?: Property;
  agent?: User;
}

export type DealStage =
  | "Inquiry"
  | "Qualified"
  | "Visit"
  | "Offer"
  | "Negotiation"
  | "Booking"
  | "Documentation"
  | "Closed Won"
  | "Closed Lost";

export interface Deal {
  id: string;
  agency_id: string;
  property_id: string;
  lead_id?: string;
  client_name: string;
  client_phone: string;
  agent_id: string;
  stage: DealStage;
  offer_amount: number;
  agreed_amount: number;
  token_amount: number;
  commission_rate: number;
  commission_amount: number;
  expected_close_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  property?: Property;
  agent?: User;
}

export interface AuditLog {
  id: string;
  agency_id: string;
  actor_name: string;
  actor_role: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: string;
  created_at: string;
}

export interface DashboardMetrics {
  total_properties: number;
  available_properties: number;
  total_pipeline_value: number;
  total_leads: number;
  new_leads: number;
  scheduled_visits: number;
  active_deals: number;
  conversion_rate: number;
  total_rent_roll_pkr?: number;
  active_leases_count?: number;
  open_maintenance_count?: number;
  recent_leads: Lead[];
  upcoming_visits: Visit[];
  stage_distribution: Record<string, number>;
  purpose_distribution: Record<string, number>;
  city_distribution: Record<string, number>;
}

/* =========================================================================
   Phase 3: Rental Operations & Maintenance Models
   ========================================================================= */

export type LeaseStatus = "Active" | "Pending" | "Expired" | "Terminated";
export type PaymentFrequency = "Monthly" | "Quarterly" | "Bi-Annually" | "Annually";
export type RentPaymentStatus = "Paid" | "Pending" | "Overdue";

export interface RentPayment {
  id: string;
  lease_id: string;
  due_date: string;
  amount_pkr: number;
  status: RentPaymentStatus;
  paid_date?: string;
  payment_method?: string;
  receipt_number?: string;
  notes?: string;
}

export interface Lease {
  id: string;
  agency_id: string;
  property_id: string;
  property_title: string;
  property_code: string;
  unit_number?: string;
  tenant_name: string;
  tenant_phone: string;
  tenant_email: string;
  tenant_cnic?: string;
  landlord_name: string;
  landlord_phone: string;
  start_date: string;
  end_date: string;
  rent_amount_pkr: number;
  security_deposit_pkr: number;
  payment_frequency: PaymentFrequency;
  status: LeaseStatus;
  terms_notes?: string;
  created_at: string;
  updated_at: string;
  rent_schedule: RentPayment[];
  property?: Property;
}

export type MaintenancePriority = "Low" | "Medium" | "High" | "Emergency";
export type MaintenanceCategory =
  | "Plumbing"
  | "Electrical"
  | "HVAC"
  | "Carpentry"
  | "Paint & Masonry"
  | "General";
export type MaintenanceStatus = "Reported" | "Assigned" | "In Progress" | "Resolved" | "Cancelled";

export interface MaintenanceRequest {
  id: string;
  ticket_number: string;
  agency_id: string;
  property_id: string;
  property_title: string;
  unit_number?: string;
  reported_by: string;
  reporter_phone: string;
  priority: MaintenancePriority;
  category: MaintenanceCategory;
  description: string;
  status: MaintenanceStatus;
  contractor_name?: string;
  contractor_phone?: string;
  estimated_cost_pkr?: number;
  actual_cost_pkr?: number;
  created_at: string;
  scheduled_date?: string;
  resolved_at?: string;
  notes?: string;
  property?: Property;
}
