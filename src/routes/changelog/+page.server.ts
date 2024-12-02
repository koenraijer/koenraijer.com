import fs from 'fs/promises';
import path from 'path';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface ChangelogEntry {
    year: string;
    month: string;
    date: string;
    message: string;
}

interface ChangelogData {
    changelog: ChangelogEntry[];
}

export const load: PageServerLoad = async () => {
    try {
        // Read the changelog.json file
        const filePath = path.join(process.cwd(), 'src', 'routes', 'changelog', 'changelog.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const changelogData = JSON.parse(fileContent) as ChangelogData;

        // Validate the data structure
        if (!changelogData.changelog || !Array.isArray(changelogData.changelog)) {
            throw new Error('Invalid changelog data structure');
        }

        // Sort entries by date in reverse chronological order
        changelogData.changelog.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return {
            changelog: changelogData
        };
    } catch (err) {
        console.error('Error loading changelog:', err);
        
        if (err instanceof Error && err.message.includes('ENOENT')) {
            throw error(404, {
                message: 'Changelog file not found'
            });
        }

        throw error(500, {
            message: 'Error loading changelog data'
        });
    }
};