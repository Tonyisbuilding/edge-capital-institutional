const FALLBACK_APP_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxEY8PyIZSk9irTrQBS-0TC1EM7YrUij4hCL-DM45_CY-rh2khXhXVyab-i8PwRwZJi/exec";

const APP_SCRIPT_URL =
    process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? FALLBACK_APP_SCRIPT_URL;

type SubmitPayload = Record<string, unknown>;

interface SubmitOptions<TPayload extends object> {
    formSlug: string;
    payload: TPayload;
}

interface SheetResponse {
    ok: boolean;
    message?: string;
    [key: string]: unknown;
}

async function submitToGoogleSheet<TPayload extends object>({
    formSlug,
    payload,
}: SubmitOptions<TPayload>): Promise<SheetResponse> {
    if (!APP_SCRIPT_URL) {
        throw new Error(
            "Missing NEXT_PUBLIC_GOOGLE_SCRIPT_URL. Add it to your environment to enable submissions."
        );
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL && FALLBACK_APP_SCRIPT_URL) {
        console.warn(
            "NEXT_PUBLIC_GOOGLE_SCRIPT_URL not set. Falling back to the default Google Apps Script endpoint."
        );
    }

    const response = await fetch(APP_SCRIPT_URL, {
        method: "POST",
        headers: {
            // Avoid CORS preflight (Apps Script doesn't allow OPTIONS here)
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
            formSlug,
            ...(payload as SubmitPayload),
        }),
    });

    // Try to parse JSON; if not, show raw text to aid debugging
    const raw = await response.text();
    let data: SheetResponse;
    try {
        data = JSON.parse(raw) as SheetResponse;
    } catch {
        throw new Error(
            `Kon het antwoord van Google Sheets niet lezen. Server zei: ${raw?.slice(0, 300) || "(leeg)"}`
        );
    }

    if (!response.ok || !data.ok) {
        const message =
            data?.message ||
            `Google Sheets koppeling gaf een fout (${response.status}). Probeer het later opnieuw.`;
        throw new Error(message);
    }

    return data;
}

export { submitToGoogleSheet };
export type { SheetResponse };

// ────────────────────────────────────────────────────────────────────────────────
// Fund Returns CMS API
// ────────────────────────────────────────────────────────────────────────────────

const FALLBACK_FUND_RETURNS_URL =
    "https://script.google.com/macros/s/AKfycbzl1PE1ZsrGpXeitOMqEqysD2STNw11KwGYFl7VAUCQP6J0zRCl3uJZGCx9AcZqBh2GrQ/exec";

const FUND_RETURNS_SCRIPT_URL =
    process.env.NEXT_PUBLIC_FUND_RETURNS_SCRIPT_URL ?? FALLBACK_FUND_RETURNS_URL;

interface FundMonth {
    nl: string;
    en: string;
    key: string;
}

interface FundReturns {
    monthly: number;
    ytd: number;
    since_inception: number;
    cagr: number;
}

interface FundClassData {
    month: FundMonth;
    returns: FundReturns;
}

interface FundReturnsResponse {
    EC_Class_I: FundClassData | null;
    EC_Class_II: FundClassData | null;
    EC_Class_III: FundClassData | null;
}

/**
 * Fetches the latest published fund returns from the Google Sheets CMS
 */
async function fetchFundReturns(): Promise<FundReturnsResponse | null> {
    if (!FUND_RETURNS_SCRIPT_URL) {
        console.warn(
            "NEXT_PUBLIC_FUND_RETURNS_SCRIPT_URL not set. Fund returns will use fallback data."
        );
        return null;
    }

    try {
        const response = await fetch(FUND_RETURNS_SCRIPT_URL, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data as FundReturnsResponse;
    } catch (error) {
        console.error("Failed to fetch fund returns:", error);
        return null;
    }
}

export { fetchFundReturns };
export type { FundReturnsResponse, FundClassData, FundMonth, FundReturns };
