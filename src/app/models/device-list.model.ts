
export interface DeviceCap {
    feature: string;
    product_family: string;
}

export interface Device {
    device_id: string;
    serial_num: string;
    device_name: string;
    created_at: Date;
    updated_at: Date;
    last_contacted: Date;
    selected?: boolean;
    device_cap: DeviceCap[];
}

export interface DeviceListResponse {
    total_results: number;
    search_results: Device[];
}
